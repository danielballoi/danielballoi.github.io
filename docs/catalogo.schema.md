# Schema del catalogo (`VITE_CATALOG_URL`)

Quando la variabile d'ambiente `VITE_CATALOG_URL` è definita, il sito prova a leggere da quell'indirizzo un documento JSON con questa forma, per aggiornare episodi video e certificazioni **senza rifare il deploy** (fase 2, infrastruttura AWS). Se la variabile non è definita, se la richiesta fallisce, va in timeout (5 secondi) o il JSON non rispetta questo schema, il sito **ignora silenziosamente** la risposta e resta sui dati locali in `site/src/content/`.

Vedi l'implementazione in `site/src/lib/catalog.js` (`fetchRemoteCatalog`, `useCatalog`) e l'esempio conforme in `site/src/content/catalogo-esempio.json`.

## Forma del documento

```jsonc
{
  "projects": [
    {
      "slug": "balloi-immobiliare",      // deve combaciare con lo slug del progetto locale
      "episodes": [
        {
          "id": 1,                        // numero progressivo, univoco nel progetto
          "title": { "it": "...", "en": "..." },
          "duration": "0:33",              // mm:ss
          "videoUrl": "https://.../ep1.mp4",
          "posterUrl": "https://.../ep1-poster.jpg"
        }
      ]
    }
  ],
  "certifications": [
    {
      "id": "aws-saa",                    // identificatore stabile
      "name": "AWS Certified Solutions Architect – Associate",
      "issuer": "Amazon Web Services",
      "issuedAt": "2026-09-18",           // ISO 8601, o null se non ancora rilasciata
      "expiresAt": "2029-09-18",          // ISO 8601, o null se non prevista
      "pdfUrl": "https://.../certificato.pdf",
      "previewUrl": "https://.../certificato-preview.jpg",
      "verifyUrl": "https://.../verifica",
      "status": "issued"                   // "issued" | "in-preparation"
    }
  ]
}
```

## Regole di validazione lato client

Il sito considera valido un catalogo solo se:
- la risposta HTTP ha stato 2xx ed è JSON;
- l'oggetto radice ha sia `projects` sia `certifications` come array (anche vuoti).

Qualunque altro caso (rete assente, timeout, JSON malformato, campi mancanti) fa sì che il sito continui a usare i dati locali: nessuna schermata bianca, nessun errore visibile.

## Catalogo di esempio

`site/src/content/catalogo-esempio.json` contiene un documento conforme, utile per testare manualmente `VITE_CATALOG_URL` puntandolo a un file servito staticamente (es. `http://localhost:8080/catalogo-esempio.json`) durante lo sviluppo.
