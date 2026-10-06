// Test con il runner integrato di Node: S3, SSM e GitHub sono simulati, nessuna chiamata di rete.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { creaHandler, decodificaKey, DIMENSIONE_MASSIMA } from '../src/pubblica.mjs'

const ESEMPIO = readFileSync(new URL('../progetti/esempio.json', import.meta.url), 'utf8')
const EVENTO_ESEMPIO = JSON.parse(readFileSync(new URL('../events/esempio-evento-s3.json', import.meta.url), 'utf8'))
// Valore finto, usato solo per verificare che non compaia mai nei log.
const TOKEN_FINTO = 'token-finto-solo-per-i-test'
const PERCORSO = 'site/src/content/progetti/esempio.json'

const ENV = {
  GITHUB_REPO: 'danielballoi/danielballoi.github.io',
  GITHUB_BRANCH: 'main',
  GITHUB_TOKEN_PARAM: '/portfolio/github-token',
  TARGET_DIR: 'site/src/content/progetti',
}

function evento(key, size) {
  return { Records: [{ s3: { bucket: { name: 'bucket-prova' }, object: { key, ...(size ? { size } : {}) } } }] }
}

// GitHub finto: un repository in memoria con l'API "contents".
function creaGitHubFinto({ file = {}, erroreScrittura = null } = {}) {
  const chiamate = []
  let numeroCommit = 0
  async function fetch(url, opzioni) {
    chiamate.push({ url, ...opzioni })
    const { pathname } = new URL(url)
    const percorso = decodeURIComponent(pathname.replace('/repos/danielballoi/danielballoi.github.io/contents/', ''))
    const risposta = (status, corpo) => new Response(JSON.stringify(corpo), { status, headers: { 'Content-Type': 'application/json' } })

    if (opzioni.method === 'GET') {
      if (!(percorso in file)) return risposta(404, { message: 'Not Found' })
      return risposta(200, { sha: file[percorso].sha, content: Buffer.from(file[percorso].contenuto).toString('base64') })
    }
    if (erroreScrittura) return risposta(erroreScrittura.status, { message: erroreScrittura.message })
    const corpo = JSON.parse(opzioni.body)
    if (percorso in file && corpo.sha !== file[percorso].sha) return risposta(409, { message: 'sha non corrisponde' })
    numeroCommit += 1
    file[percorso] = { sha: `blob${numeroCommit}`, contenuto: Buffer.from(corpo.content, 'base64').toString('utf8') }
    return risposta(numeroCommit === 1 && !corpo.sha ? 201 : 200, { commit: { sha: `commit${numeroCommit}` } })
  }
  return { fetch, chiamate, file }
}

function prepara({ contenutoS3 = ESEMPIO, github = creaGitHubFinto(), env = ENV, contentLength } = {}) {
  const log = []
  const oggettiLetti = []
  const handler = creaHandler({
    env,
    fetch: github.fetch,
    log: (riga) => log.push(riga),
    async leggiOggetto(params) {
      oggettiLetti.push(params)
      return { contentLength: contentLength ?? Buffer.byteLength(contenutoS3), testo: async () => contenutoS3 }
    },
    async leggiParametro(nome) {
      assert.equal(nome, '/portfolio/github-token')
      return TOKEN_FINTO
    },
  })
  return { handler, log, github, oggettiLetti }
}

test('evento valido: fa il commit del file nel percorso dei progetti', async () => {
  const { handler, log, github, oggettiLetti } = prepara()
  const risultato = await handler(EVENTO_ESEMPIO)

  assert.deepEqual(oggettiLetti, [{ Bucket: 'nome-del-bucket-progetti', Key: 'progetti/esempio.json' }])
  assert.equal(risultato.risultati[0].esito, 'pubblicato')
  assert.equal(risultato.risultati[0].commit, 'commit1')
  assert.equal(github.file[PERCORSO].contenuto, ESEMPIO)

  const put = github.chiamate.find((c) => c.method === 'PUT')
  const corpo = JSON.parse(put.body)
  assert.equal(corpo.message, 'feat(progetti): pubblica esempio da S3')
  assert.equal(corpo.branch, 'main')
  assert.equal(put.headers.Authorization, `Bearer ${TOKEN_FINTO}`)
  assert.ok(github.chiamate[0].url.endsWith('?ref=main'))

  assert.equal(log.length, 1)
  assert.deepEqual(JSON.parse(log[0]), {
    bucket: 'nome-del-bucket-progetti',
    key: 'progetti/esempio.json',
    slug: 'esempio',
    esito: 'pubblicato',
    commit: 'commit1',
  })
})

test('file già presente e diverso: aggiorna passando lo sha attuale', async () => {
  const github = creaGitHubFinto({ file: { [PERCORSO]: { sha: 'vecchio', contenuto: '{}' } } })
  const { handler } = prepara({ github })
  const risultato = await handler(EVENTO_ESEMPIO)
  assert.equal(risultato.risultati[0].esito, 'pubblicato')
  assert.equal(JSON.parse(github.chiamate.find((c) => c.method === 'PUT').body).sha, 'vecchio')
})

test('contenuto identico: nessun commit e lo scrive nel log', async () => {
  const github = creaGitHubFinto({ file: { [PERCORSO]: { sha: 'uguale', contenuto: ESEMPIO } } })
  const { handler, log } = prepara({ github })
  const risultato = await handler(EVENTO_ESEMPIO)

  assert.equal(github.chiamate.filter((c) => c.method === 'PUT').length, 0)
  assert.equal(risultato.risultati[0].esito, 'nessuna modifica')
  assert.equal(JSON.parse(log[0]).commit, 'nessuna modifica')
})

test('key con URL encoding viene decodificata', () => {
  assert.equal(decodificaKey('progetti/mio%2Dprogetto.json'), 'progetti/mio-progetto.json')
  assert.equal(decodificaKey('progetti/con+spazio.json'), 'progetti/con spazio.json')
})

for (const key of ['altro/esempio.json', 'progetti/Esempio.json', 'progetti/esempio.txt', 'progetti/sotto/esempio.json', 'progetti/con+spazio.json']) {
  test(`key non valida (${key}): errore chiaro e nessuna lettura da S3`, async () => {
    const { handler, oggettiLetti, log } = prepara()
    await assert.rejects(handler(evento(key)), /Key non valida/)
    assert.equal(oggettiLetti.length, 0)
    assert.equal(JSON.parse(log[0]).esito, 'errore')
  })
}

test('JSON non valido: errore chiaro, nessuna chiamata a GitHub', async () => {
  const { handler, github } = prepara({ contenutoS3: '{ "slug": "esempio", ' })
  await assert.rejects(handler(evento('progetti/esempio.json')), /JSON non valido in progetti\/esempio\.json/)
  assert.equal(github.chiamate.length, 0)
})

test('campo obbligatorio mancante: errore che elenca i campi', async () => {
  const progetto = JSON.parse(ESEMPIO)
  delete progetto.summary.en
  delete progetto.links.adr
  progetto.status = 'finito'
  const { handler, github } = prepara({ contenutoS3: JSON.stringify(progetto) })
  await assert.rejects(handler(evento('progetti/esempio.json')), (err) => {
    assert.match(err.message, /"summary\.en" mancante/)
    assert.match(err.message, /"links\.adr" mancante/)
    assert.match(err.message, /"status" deve essere uno tra/)
    return true
  })
  assert.equal(github.chiamate.length, 0)
})

test('slug nel file diverso dal nome del file: errore', async () => {
  const { handler } = prepara({ contenutoS3: ESEMPIO })
  await assert.rejects(handler(evento('progetti/altro-nome.json')), /diverso dal nome del file/)
})

test('file troppo grande (dimensione nell\'evento): errore senza leggere da S3', async () => {
  const { handler, oggettiLetti } = prepara()
  await assert.rejects(handler(evento('progetti/esempio.json', DIMENSIONE_MASSIMA + 1)), /File troppo grande/)
  assert.equal(oggettiLetti.length, 0)
})

test('file troppo grande (evento lanciato a mano senza size): errore dopo GetObject', async () => {
  const { handler, github } = prepara({ contentLength: 200 * 1024 })
  await assert.rejects(handler(evento('progetti/esempio.json')), /File troppo grande: 204800 byte/)
  assert.equal(github.chiamate.length, 0)
})

test('errore GitHub: eccezione con status e messaggio, log di errore', async () => {
  const github = creaGitHubFinto({ erroreScrittura: { status: 403, message: 'Resource not accessible by integration' } })
  const { handler, log } = prepara({ github })
  await assert.rejects(handler(EVENTO_ESEMPIO), /GitHub scrittura di .* fallita: HTTP 403 - Resource not accessible by integration/)
  assert.equal(JSON.parse(log[0]).esito, 'errore')
})

test('errore SSM: eccezione chiara', async () => {
  const handler = creaHandler({
    env: ENV,
    fetch: creaGitHubFinto().fetch,
    log: () => {},
    leggiOggetto: async () => ({ testo: async () => ESEMPIO }),
    leggiParametro: async () => {
      const err = new Error('User is not authorized to perform: ssm:GetParameter')
      err.name = 'AccessDeniedException'
      throw err
    },
  })
  await assert.rejects(handler(EVENTO_ESEMPIO), /Lettura del token da SSM \(\/portfolio\/github-token\) fallita: AccessDeniedException/)
})

test('il token non compare mai nei log, nemmeno se GitHub lo riporta nel messaggio', async () => {
  const github = creaGitHubFinto({ erroreScrittura: { status: 401, message: `Bad credentials ${TOKEN_FINTO}` } })
  const { handler, log } = prepara({ github })
  const scritti = []
  const originali = { log: console.log, error: console.error, warn: console.warn, info: console.info }
  for (const nome of Object.keys(originali)) console[nome] = (...args) => scritti.push(args.join(' '))
  let errore
  try {
    await handler(EVENTO_ESEMPIO)
  } catch (err) {
    errore = err
  } finally {
    Object.assign(console, originali)
  }
  assert.ok(errore, 'doveva lanciare un errore')
  assert.ok(!errore.message.includes(TOKEN_FINTO))
  for (const riga of [...log, ...scritti]) assert.ok(!riga.includes(TOKEN_FINTO), `token trovato nel log: ${riga}`)

  // Anche nel caso di successo
  const ok = prepara()
  await ok.handler(EVENTO_ESEMPIO)
  for (const riga of ok.log) assert.ok(!riga.includes(TOKEN_FINTO))
})

test('variabile d\'ambiente mancante: errore all\'avvio', () => {
  const { TARGET_DIR, GITHUB_BRANCH, ...incompleto } = ENV
  assert.throws(
    () => creaHandler({ env: incompleto, fetch: () => {}, leggiOggetto: () => {}, leggiParametro: () => {} }),
    /Variabili d'ambiente mancanti: GITHUB_BRANCH, TARGET_DIR/,
  )
})

test('evento senza Records: errore; s3:TestEvent: ignorato', async () => {
  const { handler, log } = prepara()
  await assert.rejects(handler({}), /Evento non valido/)
  assert.deepEqual(await handler({ Event: 's3:TestEvent' }), { risultati: [] })
  assert.equal(JSON.parse(log[0]).esito, 'ignorato')
})
