# danielballoi.github.io

CV online di Daniel Balloi — DevOps & Release Engineer. Sito React pre-renderizzato staticamente, pubblicato su GitHub Pages, disponibile in italiano e inglese.

## Architettura (fase 1)

- **React + Vite**, con pre-rendering statico via [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg): ogni pagina e ogni lingua viene generata come HTML completo al momento della build (motivazione in `docs/decisioni/0001-prerendering.md`).
- **Contenuti** separati dal codice in `site/src/content/` (profilo, esperienza, certificazioni, competenze, progetti — uno per file, vedi `docs/come-aggiungere-un-progetto.md`).
- **Hosting**: GitHub Pages, repository pubblico `danielballoi.github.io`, pubblicato automaticamente da `.github/workflows/deploy-site.yml` a ogni push su `main` che tocca `site/`.
- **Nessun cookie di tracciamento**, nessuna libreria di analytics.
- **Pronto per la fase 2** (infrastruttura AWS, cartelle `functions/` e `infra/`): il sito legge `VITE_CATALOG_URL` per un catalogo remoto di video/certificazioni e `VITE_CONTACT_API_URL` per il modulo contatti, con fallback automatico ai dati locali se non sono definite o la rete non risponde (`docs/catalogo.schema.md`).

```
site/        pagine React + Vite (questa fase)
functions/   (fase 2) Lambda Node.js 22 — segnaposto
infra/       (fase 2) Terraform — segnaposto
docs/        analisi, contenuti, ADR, schema del catalogo
.github/     workflow di pubblicazione
```

## Come avviare il sito in locale

Richiede **Node.js 22**.

```bash
cd site
npm install
npm run dev       # sviluppo, con pre-rendering anche in dev
npm run build     # build di produzione in site/dist/
npm run preview   # serve la build di produzione in locale
npm test          # test Vitest (lingua, catalogo, validazione form)
npm run lint      # ESLint
```

Script di preparazione asset (da rilanciare solo se si sostituiscono i file sorgente):

```bash
npm run prepare:images          # WebP/AVIF/JPG della foto di intestazione (richiede sharp, già in devDependencies)
npm run prepare:certifications  # anteprima JPEG della prima pagina di ogni PDF (richiede pdftoppm/poppler-utils installato sul sistema)
npm run prepare:og              # immagini Open Graph 1200x630 (IT/EN)
```

## Come aggiungere un progetto

Vedi `docs/come-aggiungere-un-progetto.md`: basta un file JSON in `site/src/content/progetti/` e le sue immagini/video in `site/public/`, senza toccare componenti o rotte. Le pagine `/progetti/<slug>` e `/en/projects/<slug>` vengono generate in automatico alla build.

## Pubblicazione

1. Nelle impostazioni del repository su GitHub: **Settings → Pages → Source → GitHub Actions**.
2. (Opzionale, per la fase 2) In **Settings → Secrets and variables → Actions → Variables** aggiungere `VITE_CATALOG_URL` e/o `VITE_CONTACT_API_URL` quando saranno disponibili: non sono segreti, la build funziona anche senza.
3. Ogni push su `main` che modifica `site/` esegue automaticamente `npm ci`, lint, test, build e pubblica su GitHub Pages tramite `.github/workflows/deploy-site.yml`.

## Documentazione

- `docs/analisi-funzionale-portfolio-v1.md` — requisiti e criteri di accettazione.
- `docs/contenuti-sito.md` e `docs/aggiornamenti-contenuti.md` — fonti dei testi.
- `docs/decisioni/` — Architecture Decision Records.
- `docs/catalogo.schema.md` — formato del catalogo remoto (fase 2).
- `docs/come-aggiungere-un-progetto.md` — guida pratica con esempio.
