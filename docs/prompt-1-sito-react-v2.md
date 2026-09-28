# Prompt 1 per Claude Code — Il sito portfolio (React + Vite) · v2 del 28/9

> Come usarlo: crea su GitHub il repository pubblico vuoto `danielballoi.github.io`, clonalo sul PC, estrai lo zip `materiali-portfolio.zip` nella radice del repository (crea le cartelle `docs/` e `materiali/`), poi apri Claude Code nella cartella del repository e incolla tutto il testo qui sotto (dalla riga "---" in poi).

---

Sei il mio partner tecnico per costruire il mio sito portfolio/CV online. Io sono Daniel Balloi, DevOps & Release Engineer. Il sito deve convincere recruiter HR (30-60 secondi di attenzione) e tecnici (3-5 minuti). Leggi prima, per intero, `docs/analisi-funzionale-portfolio-v1.md` (requisiti RF-01…RF-23 con criteri di accettazione), `docs/contenuti-sito.md` (testi IT/EN) e **`docs/aggiornamenti-contenuti.md`, che prevale sugli altri due** dove li contraddice (competenze con stelle e loghi, esperienza Stackhouse corretta, sezione personale, video veri). Sono la fonte di verità. Nella cartella `materiali/` trovi foto, CV in PDF e i 7 video con le copertine. Se trovi contraddizioni o dubbi, chiedimi prima di decidere.

## Obiettivo di questa fase

Costruire **solo il sito** (cartella `site/`) e la sua **pubblicazione su GitHub Pages**. L'infrastruttura AWS (video, certificazioni, modulo contatti) arriverà in una fase successiva: in questa fase il sito deve funzionare **da solo**, con dati locali, e deve essere già pronto a collegarsi ad AWS tramite variabili d'ambiente.

## Vincoli tecnici

- **React + Vite**, JavaScript (niente TypeScript, a meno che non ti chieda il contrario), Node.js 22.
- **Pre-rendering statico obbligatorio**: ogni pagina e ogni lingua deve essere un file HTML già completo al momento della build (contenuto, `<title>`, meta description, meta Open Graph per LinkedIn), perché LinkedIn e i motori di ricerca non eseguono JavaScript. Scegli tu la soluzione (per esempio `vite-react-ssg` o equivalente) e motiva la scelta in `docs/decisioni/0001-prerendering.md`.
- Pagine da generare: `/`, `/progetti/balloi-immobiliare`, `/privacy`, e le equivalenti inglesi `/en/`, `/en/projects/balloi-immobiliare`, `/en/privacy`. Una pagina `404.html` utile.
- Hosting su **GitHub Pages** (user site: il sito sta alla radice del dominio, base path `/`).
- **Nessun cookie di tracciamento**, nessuna libreria di analytics.
- Dipendenze minime: aggiungi una libreria solo se fa un lavoro sostanziale, e scrivi perché.
- Contenuti separati dal codice: tutti i testi e i dati in file JSON (o JS) sotto `site/src/content/`, uno per lingua dove serve (profilo, esperienze, certificazioni, progetti, competenze), popolati da `docs/contenuti-sito.md`.

## Collegamento futuro ad AWS (da predisporre ora)

- Variabile `VITE_CATALOG_URL`: se definita, all'avvio della pagina il sito legge da quell'indirizzo il catalogo JSON di video ed episodi e certificazioni; se non è definita o la richiesta fallisce, usa i **dati locali** in `site/src/content/`. Il sito non deve mai rompersi se AWS non risponde.
- Variabile `VITE_CONTACT_API_URL`: se definita, il modulo contatti invia una richiesta `POST` JSON `{ name, email, message, consent, website }` (`website` è il campo nascosto anti-bot, deve restare vuoto) a quell'indirizzo; se non è definita, il modulo è sostituito da un pulsante email e da un pulsante "copia indirizzo".
- Definisci e documenta in `docs/catalogo.schema.md` il **formato del catalogo** che il sito si aspetta (progetti → episodi con id, titoli IT/EN, durata, URL del video MP4, URL della copertina; certificazioni con nome, ente, date, URL del PDF, URL dell'anteprima, URL di verifica, stato). Crea un catalogo di esempio locale conforme.

## Aspetto grafico: "Blueprint tecnico"

- Il sito ricorda un **disegno tecnico d'architettura**: sfondo carta chiara e fredda con una **griglia sottile**, linee e connettori sottili che collegano le sezioni come in un diagramma, didascalie tecniche in carattere monospazio (es. `// 02 — PROGETTI`, quote, misure).
- Palette di partenza (definisci tutto come variabili CSS): carta `#F4F7FB`, griglia `#DCE5F2`, inchiostro blu `#1E3A8A`, testo `#16213A`, testo secondario `#5A6A86`, accento caldo `#E0582F` usato **solo** per le azioni principali (CV, invio modulo). Tema scuro "blueprint notturno" (sfondo `#0D1A33`, griglia `#1E3159`, linee `#8FB3FF`, testo `#E6EDF8`) attivo con `prefers-color-scheme: dark`, con controlli di contrasto WCAG AA in entrambi i temi.
- Caratteri da Google Fonts: **IBM Plex Sans Condensed** per i titoli, **IBM Plex Sans** per il testo, **IBM Plex Mono** per etichette, didascalie e dati. Sempre con caratteri di riserva.
- Diagramma dell'architettura di Balloi in **SVG** nello stesso stile (browser → nginx → backend → MySQL su EC2; S3; GitHub Container Registry), usato nella pagina di dettaglio. Le linee possono "disegnarsi" all'ingresso, ma solo se l'utente non ha attivato "riduci animazioni", e il contenuto deve essere sempre visibile anche senza animazione.
- Evita gli stili generici: niente gradienti viola, niente emoji come icone, niente angoli arrotondati e ombre uguali su ogni blocco. Ogni scelta deve venire dal tema "disegno tecnico".
- Layout che funziona da 360 px di larghezza; nessuno scorrimento orizzontale della pagina.

## Funzionalità da implementare (vedi i criteri nell'analisi)

1. Intestazione con foto (`materiali/foto/foto.jpg` → ottimizzala in WebP/AVIF con fallback JPG, ritaglio verticale; c'è anche `foto-quadrata.jpg`), nome, titolo, riga di esperienza, badge AWS, disponibilità, frase di valore, pulsanti (CV nella lingua corrente: `materiali/cv/cv-daniel-balloi-it.pdf` e `-en.pdf` → copiali in `site/public/cv/`).
2. Menu fisso con ancore alle sezioni, menu a scomparsa su telefono.
3. Cambio lingua IT/EN che porta alla stessa pagina nell'altra lingua; alla prima visita proposta della lingua del browser; scelta ricordata (con `localStorage` protetto da try/catch).
4. Progetto in evidenza (Balloi) con **carosello manuale** degli episodi (frecce, puntini, swipe, tastiera, titolo e durata visibili) e **lettore video**: parte muto con sottotitoli già incisi nel video, audio attivabile, copertina prima dell'avvio, un solo video alla volta. I video veri ci sono già: `materiali/video/balloi-ep1.mp4` … `balloi-ep7.mp4` con le copertine `balloi-epN-copertina.jpg` (titoli e durate in `docs/aggiornamenti-contenuti.md`). Copiali in `site/public/video/`, usa `preload="none"` e la copertina come `poster`.
5. Schede degli altri progetti con stato "in lavorazione".
6. Pagina di dettaglio del progetto (diagramma SVG, episodi, problemi e soluzioni, tecnologie, link).
7. Linea del tempo di esperienza e formazione (voce più recente aperta, le altre espandibili).
8. Certificazioni con anteprima, apertura del PDF, download, pulsante "Verifica" (URL da fornire; usa segnaposto evidenti), stato "in preparazione".
9. Competenze con **logo ufficiale** (pacchetto `simple-icons`), **valutazione a stelle da 1 a 5 con legenda visibile** e link "dove è dimostrata" per ogni tecnologia, raggruppate come in `docs/aggiornamenti-contenuti.md` (sostituisce il vecchio RF-14). I livelli sono provvisori: tienili in `site/src/content/skills.json` così li cambio da solo.
9b. Sezione **"Fuori dal lavoro" / "Beyond work"** prima dei contatti: 2-3 righe e foto facoltativa, con testo segnaposto evidente.
10. Sezione "Come lavoro" con tre schede (runbook, ADR, diario) e link ai file su GitHub del progetto Balloi.
11. Modulo contatti con validazione, stati (invio, conferma, errore con alternativa email), casella di consenso con link a `/privacy`, campo nascosto anti-bot.
12. Pagina privacy in IT/EN (dati raccolti dal modulo, finalità, conservazione 12 mesi, come chiedere la cancellazione, nessun cookie di tracciamento).
13. Meta tag per pagina e lingua (title, description, Open Graph, `og:image` 1200×630 in stile blueprint generata come file statico, `hreflang` tra le due lingue, `sitemap.xml`, `robots.txt`).

## Qualità

- Accessibilità: HTML semantico, focus visibile, uso completo da tastiera, testi alternativi, `lang` corretto per pagina.
- Test: aggiungi test automatici essenziali (per esempio con Vitest) per la logica non banale: scelta della lingua, lettura del catalogo con fallback ai dati locali, validazione del modulo.
- Script npm: `dev`, `build`, `preview`, `test`, `lint`.
- Obiettivo Lighthouse ≥ 90 in prestazioni, accessibilità, best practice e SEO sulla build di produzione: verificalo e riportami i punteggi.

## Pubblicazione

- Workflow `.github/workflows/deploy-site.yml`: a ogni push su `main` che tocca `site/`, esegue `npm ci`, test, build e pubblica su GitHub Pages con le azioni ufficiali (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`), con permessi minimi (`contents: read`, `pages: write`, `id-token: write`).
- Le variabili `VITE_CATALOG_URL` e `VITE_CONTACT_API_URL` arrivano dalle "Variables" del repository (non sono segreti); se mancano, la build funziona lo stesso con i dati locali.
- Scrivimi le istruzioni per attivare GitHub Pages ("Source: GitHub Actions") nelle impostazioni del repository.

## Struttura attesa del repository

```
site/        pagine React + Vite (questa fase)
functions/   (fase 2) Lambda Node.js 22 — crea solo la cartella con un README segnaposto
infra/       (fase 2) Terraform — crea solo la cartella con un README segnaposto
docs/        analisi, contenuti, ADR, schema del catalogo, diario
.github/     workflow
README.md    descrizione del progetto (architettura, come si avvia, come si pubblica)
```

## Come lavorare con me

- Prima di scrivere codice, mostrami un **piano** a passi (struttura dei componenti, libreria di pre-rendering scelta, organizzazione dei contenuti) e aspetta il mio ok.
- Procedi per passi piccoli, con un commit per passo e messaggi in stile Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`).
- Io sono un DevOps, non uno sviluppatore frontend: quando fai una scelta di frontend spiegamela in due righe, senza gergo.
- **Onestà dei contenuti:** a Stackhouse la mia esperienza pratica è su rilasci, pipeline CI/CD e database MySQL on-premise; sul cloud AWS ho fatto coordinamento come PMO. Non scrivere mai il contrario. L'esperienza AWS pratica viene dal progetto Balloi.
- Il numero di telefono non va pubblicato sul sito.
- Non inventare dati su di me: dove manca un'informazione (foto, CV, link di verifica, email), usa un segnaposto evidente e segnalamelo in un elenco finale "Da fornire".
- Alla fine: elenco dei requisiti RF soddisfatti, punteggi Lighthouse, elenco "Da fornire", e istruzioni per la pubblicazione.
