# Come aggiungere un nuovo progetto

Il sito genera automaticamente la scheda in home e la pagina di dettaglio di ogni progetto a partire da un file JSON. **Non serve modificare componenti React né file di rotte**: basta aggiungere il file di contenuto e le immagini/video.

## 1. Crea il file di contenuto

Crea `site/src/content/progetti/<slug-progetto>.json`. Lo `slug` (nel nome del file e nel campo `"slug"`) determina l'indirizzo della pagina:

- italiano: `/progetti/<slug-progetto>`
- inglese: `/en/projects/<slug-progetto>`

Entrambe le pagine vengono create in automatico alla build successiva (`npm run build`): `site/src/lib/projects.js` legge tutti i file in quella cartella e `site/src/routes.jsx` li passa a `vite-react-ssg` tramite `getStaticPaths()`.

### Campi del file

| Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|
| `slug` | stringa | sì | deve combaciare con il nome del file, solo lettere minuscole/numeri/trattini |
| `status` | `"online"` \| `"in-progress"` | sì | mostrato come etichetta di stato nella scheda |
| `featured` | booleano | sì | `true` solo per il progetto in evidenza (uno solo); gli altri `false` |
| `title.it` / `title.en` | stringa | sì | titolo del progetto |
| `type.it` / `type.en` | stringa | sì | tipo di architettura, es. "Server singolo · API REST" |
| `summary.it` / `summary.en` | stringa | sì | una riga per la scheda |
| `problem.it/en`, `solution.it/en` | stringa | no (può essere `null`) | usati nella pagina di dettaglio; se `null` la sezione non viene mostrata |
| `results.it` / `results.en` | array di stringhe | no | numeri/risultati, mostrati come elenco |
| `technologies` | array di stringhe | sì | etichette tecnologie (nomi semplici, es. `"Docker"`) |
| `links.github` / `links.diario` / `links.adr` | stringa URL o `null` | sì (anche se `null`) | link esterni nella pagina di dettaglio |
| `architecture` | oggetto o `null` | no | vedi sotto — diagramma SVG del progetto |
| `episodes` | array | no | episodi video, vedi sotto; array vuoto se non ci sono video |
| `subtitlesNote.it` / `subtitlesNote.en` | stringa o `null` | no | nota tipo "Voice and subtitles in Italian" per la versione EN dei video in italiano |

### `architecture` (facoltativo)

```json
"architecture": {
  "diagram": "<slug-progetto>",
  "nodes": [
    { "id": "browser", "label": { "it": "Browser", "en": "Browser" } }
  ]
}
```
`diagram` è il nome del file SVG in `site/src/components/diagrams/` (uno per progetto, nello stile "blueprint"). Se il progetto non ha ancora un diagramma, lascia `"architecture": null`.

### `episodes` (facoltativo)

```json
{
  "id": 1,
  "title": { "it": "Titolo", "en": "Title" },
  "duration": "0:33",
  "video": "/video/<slug-progetto>-ep1.mp4",
  "poster": "/video/<slug-progetto>-ep1-copertina.jpg"
}
```

## 2. Copia le immagini e i video

Metti i file in `site/public/`, con lo stesso `<slug-progetto>` nel nome per ritrovarli facilmente:

- video: `site/public/video/<slug-progetto>-epN.mp4`
- copertine: `site/public/video/<slug-progetto>-epN-copertina.jpg`

I percorsi nel JSON (`video`, `poster`) devono iniziare con `/` e combaciare con quanto copiato in `public/`.

## 3. Ricostruisci il sito

```bash
cd site
npm run build
```

Controlla nell'output che compaiano le due nuove pagine, per esempio:

```
dist/progetti/<slug-progetto>/index.html
dist/en/projects/<slug-progetto>/index.html
```

Non serve altro: la scheda del progetto compare da sola nella sezione "Progetti" della home (in ordine: prima il progetto `featured`, poi gli altri in ordine alfabetico di slug), in entrambe le lingue.

## Esempio completo

Immaginiamo un quarto progetto, "Monitoraggio con Prometheus", ancora in lavorazione, senza episodi né diagramma.

`site/src/content/progetti/monitoraggio-prometheus.json`:

```json
{
  "slug": "monitoraggio-prometheus",
  "status": "in-progress",
  "featured": false,
  "title": { "it": "Monitoraggio con Prometheus", "en": "Monitoring with Prometheus" },
  "type": { "it": "Osservabilità", "en": "Observability" },
  "summary": {
    "it": "Metriche e allarmi per una piccola infrastruttura, con Prometheus e Grafana.",
    "en": "Metrics and alerting for a small infrastructure, with Prometheus and Grafana."
  },
  "problem": { "it": null, "en": null },
  "solution": { "it": null, "en": null },
  "results": { "it": [], "en": [] },
  "technologies": ["Prometheus", "Grafana", "Alertmanager"],
  "links": { "github": null, "diario": null, "adr": null },
  "architecture": null,
  "episodes": []
}
```

Dopo `npm run build`, il sito genera da solo `/progetti/monitoraggio-prometheus` e `/en/projects/monitoraggio-prometheus`, e la scheda compare in home. Quando il progetto sarà pronto, basterà aggiornare `status` a `"online"`, riempire `problem`/`solution`/`results`/`links` e aggiungere eventuali `episodes` e il diagramma — sempre senza toccare il codice.
