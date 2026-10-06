// Logica della Lambda "pubblica-progetto": legge un file di progetto caricato su S3,
// lo valida e lo pubblica nel repository del sito con l'API GitHub "contents".
// S3, SSM e fetch arrivano dall'esterno (vedi index.mjs) così i test non usano la rete.

export const DIMENSIONE_MASSIMA = 100 * 1024
const KEY_VALIDA = /^progetti\/([a-z0-9-]+)\.json$/
const SLUG_VALIDO = /^[a-z0-9-]+$/
const REPO_VALIDO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/
const STATI = ['online', 'in-progress', 'planned']
const VARIABILI = ['GITHUB_REPO', 'GITHUB_BRANCH', 'GITHUB_TOKEN_PARAM', 'TARGET_DIR']

export function leggiConfigurazione(env) {
  const mancanti = VARIABILI.filter((nome) => !env[nome] || !env[nome].trim())
  if (mancanti.length > 0) {
    throw new Error(`Variabili d'ambiente mancanti: ${mancanti.join(', ')}`)
  }
  const repo = env.GITHUB_REPO.trim()
  if (!REPO_VALIDO.test(repo)) {
    throw new Error(`GITHUB_REPO non valida: "${repo}" (formato atteso: proprietario/repository)`)
  }
  return {
    repo,
    branch: env.GITHUB_BRANCH.trim(),
    tokenParam: env.GITHUB_TOKEN_PARAM.trim(),
    targetDir: env.TARGET_DIR.trim().replace(/^\/+|\/+$/g, ''),
  }
}

// Le key negli eventi S3 sono URL-encoded e gli spazi diventano "+".
export function decodificaKey(key) {
  return decodeURIComponent(String(key).replace(/\+/g, ' '))
}

export function slugDaKey(key) {
  const trovato = KEY_VALIDA.exec(key)
  if (!trovato) {
    throw new Error(`Key non valida: "${key}" (formato atteso: progetti/<slug>.json, slug con sole lettere minuscole, numeri e trattini)`)
  }
  return trovato[1]
}

// Stessi campi obbligatori descritti in docs/come-aggiungere-un-progetto.md
// e usati da site/src/lib/projects.js e dai componenti del sito.
export function validaProgetto(progetto, slugAtteso) {
  const errori = []
  const stringaPiena = (valore) => typeof valore === 'string' && valore.trim() !== ''

  if (progetto === null || typeof progetto !== 'object' || Array.isArray(progetto)) {
    throw new Error('Progetto non valido: il file deve contenere un oggetto JSON')
  }

  if (!stringaPiena(progetto.slug)) errori.push('"slug" mancante')
  else if (!SLUG_VALIDO.test(progetto.slug)) errori.push('"slug" deve contenere solo lettere minuscole, numeri e trattini')
  else if (progetto.slug !== slugAtteso) errori.push(`"slug" ("${progetto.slug}") diverso dal nome del file ("${slugAtteso}")`)

  if (!STATI.includes(progetto.status)) errori.push(`"status" deve essere uno tra: ${STATI.join(', ')}`)
  if (typeof progetto.featured !== 'boolean') errori.push('"featured" deve essere un booleano')

  for (const campo of ['title', 'type', 'summary']) {
    const valore = progetto[campo]
    if (valore === null || typeof valore !== 'object') {
      errori.push(`"${campo}" mancante`)
      continue
    }
    for (const lingua of ['it', 'en']) {
      if (!stringaPiena(valore[lingua])) errori.push(`"${campo}.${lingua}" mancante`)
    }
  }

  if (!Array.isArray(progetto.technologies) || !progetto.technologies.every(stringaPiena)) {
    errori.push('"technologies" deve essere un array di stringhe')
  }

  const links = progetto.links
  if (links === null || typeof links !== 'object' || Array.isArray(links)) {
    errori.push('"links" mancante')
  } else {
    for (const nome of ['github', 'diario', 'adr']) {
      if (!(nome in links)) errori.push(`"links.${nome}" mancante (usa null se non c'è)`)
      else if (links[nome] !== null && typeof links[nome] !== 'string') errori.push(`"links.${nome}" deve essere una stringa o null`)
    }
  }

  if (errori.length > 0) {
    throw new Error(`Progetto "${slugAtteso}" non valido: ${errori.join('; ')}`)
  }
}

function estraiRecord(evento) {
  if (evento?.Event === 's3:TestEvent') return []
  if (!evento || !Array.isArray(evento.Records) || evento.Records.length === 0) {
    throw new Error('Evento non valido: atteso un evento S3 con Records[]')
  }
  return evento.Records.map((record, indice) => {
    const bucket = record?.s3?.bucket?.name
    const key = record?.s3?.object?.key
    if (!bucket || !key) {
      throw new Error(`Evento non valido: Records[${indice}] senza s3.bucket.name o s3.object.key`)
    }
    return { bucket, key: decodificaKey(key), size: record.s3.object.size }
  })
}

function controllaDimensione(byte) {
  if (typeof byte === 'number' && byte > DIMENSIONE_MASSIMA) {
    throw new Error(`File troppo grande: ${byte} byte (massimo ${DIMENSIONE_MASSIMA})`)
  }
}

function creaGitHub({ fetch, config, leggiToken, dimenticaToken }) {
  const base = `https://api.github.com/repos/${config.repo}/contents/`

  async function chiama(percorso, opzioni = {}) {
    const token = await leggiToken()
    const risposta = await fetch(base + percorso.split('/').map(encodeURIComponent).join('/') + (opzioni.query ?? ''), {
      method: opzioni.method ?? 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'pubblica-progetto-lambda',
        ...(opzioni.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: opzioni.body ? JSON.stringify(opzioni.body) : undefined,
    })
    if (risposta.status === 401) dimenticaToken()
    return risposta
  }

  async function errore(operazione, risposta) {
    let dettaglio = ''
    try {
      dettaglio = (await risposta.json())?.message ?? ''
    } catch {
      // corpo non JSON: basta lo status
    }
    return new Error(`GitHub ${operazione} fallita: HTTP ${risposta.status}${dettaglio ? ` - ${dettaglio}` : ''}`)
  }

  return {
    async leggi(percorso) {
      const risposta = await chiama(percorso, { query: `?ref=${encodeURIComponent(config.branch)}` })
      if (risposta.status === 404) return null
      if (!risposta.ok) throw await errore(`lettura di ${percorso}`, risposta)
      const dati = await risposta.json()
      return { sha: dati.sha, contenuto: Buffer.from(dati.content ?? '', 'base64').toString('utf8') }
    },
    async scrivi(percorso, contenuto, sha, messaggio) {
      const risposta = await chiama(percorso, {
        method: 'PUT',
        body: {
          message: messaggio,
          content: Buffer.from(contenuto, 'utf8').toString('base64'),
          branch: config.branch,
          ...(sha ? { sha } : {}),
        },
      })
      if (!risposta.ok) throw await errore(`scrittura di ${percorso}`, risposta)
      const dati = await risposta.json()
      return dati.commit?.sha
    },
  }
}

/**
 * @param {object} dipendenze
 * @param {(params: {Bucket: string, Key: string}) => Promise<{contentLength?: number, testo: () => Promise<string>, annulla?: () => void}>} dipendenze.leggiOggetto
 * @param {(nome: string) => Promise<string>} dipendenze.leggiParametro  GetParameter con WithDecryption
 * @param {typeof fetch} dipendenze.fetch
 * @param {Record<string, string|undefined>} dipendenze.env
 * @param {(riga: string) => void} [dipendenze.log]
 */
export function creaHandler({ leggiOggetto, leggiParametro, fetch, env, log = console.log }) {
  const config = leggiConfigurazione(env)

  let tokenInCache = null
  // Ultimo token letto, tenuto anche dopo un 401 solo per oscurarlo nei messaggi d'errore.
  let tokenDaOscurare = null
  const leggiToken = async () => {
    if (tokenInCache) return tokenInCache
    let valore
    try {
      valore = await leggiParametro(config.tokenParam)
    } catch (err) {
      throw new Error(`Lettura del token da SSM (${config.tokenParam}) fallita: ${err?.name ?? 'Errore'}`)
    }
    if (!valore) throw new Error(`Il parametro SSM ${config.tokenParam} è vuoto`)
    tokenInCache = valore
    tokenDaOscurare = valore
    return valore
  }
  const dimenticaToken = () => {
    tokenInCache = null
  }

  // Ultima difesa: anche se un messaggio d'errore contenesse il token, non finisce nei log.
  const pulisci = (testo) => (tokenDaOscurare ? String(testo).split(tokenDaOscurare).join('***') : String(testo))

  const github = creaGitHub({ fetch, config, leggiToken, dimenticaToken })

  async function pubblica({ bucket, key, size }) {
    const slug = slugDaKey(key)
    controllaDimensione(size)

    const oggetto = await leggiOggetto({ Bucket: bucket, Key: key })
    if (typeof oggetto.contentLength === 'number' && oggetto.contentLength > DIMENSIONE_MASSIMA) {
      oggetto.annulla?.()
      controllaDimensione(oggetto.contentLength)
    }
    const testo = await oggetto.testo()
    controllaDimensione(Buffer.byteLength(testo, 'utf8'))

    let progetto
    try {
      progetto = JSON.parse(testo)
    } catch (err) {
      throw new Error(`JSON non valido in ${key}: ${err.message}`)
    }
    validaProgetto(progetto, slug)

    const percorso = `${config.targetDir}/${slug}.json`
    const attuale = await github.leggi(percorso)
    if (attuale && attuale.contenuto === testo) {
      return { slug, esito: 'nessuna modifica', commit: 'nessuna modifica' }
    }
    const commit = await github.scrivi(percorso, testo, attuale?.sha, `feat(progetti): pubblica ${slug} da S3`)
    return { slug, esito: 'pubblicato', commit }
  }

  return async function handler(evento) {
    const record = estraiRecord(evento)
    if (record.length === 0) {
      log(JSON.stringify({ esito: 'ignorato', motivo: 's3:TestEvent' }))
      return { risultati: [] }
    }

    const risultati = []
    const errori = []
    for (const { bucket, key, size } of record) {
      try {
        const risultato = await pubblica({ bucket, key, size })
        log(JSON.stringify({ bucket, key, ...risultato }))
        risultati.push({ bucket, key, ...risultato })
      } catch (err) {
        const messaggio = pulisci(err?.message ?? err)
        const slug = KEY_VALIDA.exec(key)?.[1] ?? null
        log(JSON.stringify({ bucket, key, slug, esito: 'errore', errore: messaggio }))
        errori.push(`${key}: ${messaggio}`)
      }
    }

    if (errori.length > 0) {
      throw new Error(`Pubblicazione fallita per ${errori.length} file su ${record.length}. ${errori.join(' | ')}`)
    }
    return { risultati }
  }
}
