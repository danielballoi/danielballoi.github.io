# ADR 0001 — Pre-rendering statico con vite-react-ssg

**Stato**: accettata · 28/9/2026

## Contesto

Il sito deve essere indicizzabile dai motori di ricerca e deve mostrare anteprime corrette su LinkedIn, che non esegue JavaScript. Serve quindi HTML già completo (contenuto, `<title>`, meta description, Open Graph) per ogni pagina e ogni lingua, generato al momento della build, su hosting statico GitHub Pages. In più, il numero di progetti deve poter crescere senza toccare rotte o componenti: aggiungere un file di contenuto deve bastare a generare una nuova pagina.

## Opzioni considerate

- **Next.js (export statico)**: framework completo, ma introduce convenzioni e complessità (App Router, RSC) non necessarie per un sito di poche pagine; più difficile da spiegare e mantenere per chi non è specializzato in frontend.
- **vite-plugin-ssr / vike**: valida, ma richiede più configurazione manuale per instradare le pagine dinamiche e per l'integrazione con React Router.
- **vite-react-ssg**: estende Vite con generazione statica per React Router v6. Ogni rotta è un oggetto `RouteRecord`; le rotte dinamiche (es. `/progetti/:slug`) espongono una funzione `getStaticPaths()` che al momento della build restituisce l'elenco dei percorsi concreti da generare. Il componente della pagina non cambia: legge sempre lo `slug` dai parametri e carica il contenuto corrispondente.

## Decisione

Si usa **vite-react-ssg**. È la soluzione più leggera che soddisfa entrambi i vincoli: HTML pre-renderizzato per ogni lingua/pagina, e generazione automatica delle pagine di dettaglio progetto a partire dai file JSON in `site/src/content/progetti/`.

Meccanismo di scalabilità: `site/src/lib/projects.js` legge tutti i file `*.json` in quella cartella con `import.meta.glob`. `site/src/routes.jsx` usa `getProjectSlugs()` per popolare `getStaticPaths()` sia per la rotta italiana (`progetti/:slug`) sia per quella inglese (`projects/:slug`, sotto `/en`). Aggiungere un progetto = aggiungere un file JSON (e le sue immagini): nessuna modifica a componenti o rotte. Vedi `docs/come-aggiungere-un-progetto.md`.

Configurazione scelta in `vite.config.js`:
- `dirStyle: 'nested'` → ogni pagina diventa una cartella con `index.html` (URL puliti, es. `/progetti/balloi-immobiliare/`).
- `onFinished` copia `dist/404/index.html` in `dist/404.html`, perché GitHub Pages cerca il file 404 nella radice.

## Conseguenze

- Il comando `dev` esegue SSR anche in sviluppo (comportamento di default di vite-react-ssg), utile per verificare subito il markup pre-renderizzato.
- I meta tag per pagina si gestiscono con il componente `<Head>` esportato dalla libreria (wrapper di React Helmet), impostato in ogni pagina.
- Nessuna dipendenza da Node.js lato server in produzione: l'output è HTML statico servito da GitHub Pages, coerente con il vincolo di costo zero.
