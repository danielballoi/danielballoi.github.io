# Analisi funzionale — Sito portfolio di Daniel Balloi

**Versione**: 1.0 (decisioni chiuse il 25/9/2026) · **Indirizzo**: `https://danielballoi.github.io`

---

## 1. Scopo del sito

Il sito è il **CV online** di Daniel Balloi: presenta profilo, esperienza, progetti con video, certificazioni e contatti a chi valuta una candidatura per ruoli di **DevOps Engineer, Cloud Engineer, Infrastructure Specialist e Release Manager**.

Il sito è anche **un progetto del portfolio**: la parte dinamica (video, certificazioni, modulo contatti) funziona con un'architettura **event-driven e serverless** su AWS, in contrasto con Balloi immobiliare (API REST su un server).

Obiettivi misurabili:
- un recruiter capisce **chi è Daniel, che ruolo cerca e che esperienza ha in meno di 30 secondi**;
- un tecnico raggiunge **codice, diari e decisioni** di ogni progetto in **al massimo 2 clic**;
- il sito resta **online sempre, a costo zero**.

## 2. Profilo da comunicare

- **3 anni e mezzo come Release Specialist e Software Developer** (Stackhouse, gen 2023 – giu 2026), su applicazioni mission-critical per clienti Enterprise e Banking: ciclo di release, pipeline CI/CD su AWS, deployment su infrastrutture ibride (on-premise + AWS), database MySQL, Change Request, coordinamento Dev, QA e Ops.
- **AWS Certified Solutions Architect – Associate** (set 2026) e **CAPM** del Project Management Institute (mag 2026).
- Progetti personali che dimostrano le competenze DevOps end-to-end (Balloi immobiliare e i successivi).
- Titolo proposto: **"DevOps & Release Engineer · AWS Certified Solutions Architect"** (non "junior": 3,5 anni di esperienza su release e deployment reali).
- Disponibilità: **in sede a Cagliari, ibrido o full remote**. Inglese: esperienza di lavoro a Londra.

## 3. Chi usa il sito

| Utente | Cosa cerca | Tempo | Cosa deve trovare subito |
|---|---|---|---|
| **Recruiter HR** | ruolo, esperienza, città, disponibilità, capacità di comunicare | 30-60 s | titolo, anni di esperienza, certificazione AWS, CV scaricabile, un video breve |
| **Tecnico** (team lead, DevOps senior) | competenze reali, scelte motivate, qualità del codice | 3-5 min | architetture, link a GitHub, ADR, runbook, certificazioni verificabili |
| **Daniel** (amministratore) | aggiungere video e certificazioni senza toccare il codice | — | caricare un file e vederlo pubblicato da solo |

## 4. Mappa del sito

Una **pagina principale** a scorrimento con menu, più una **pagina di dettaglio per ogni progetto**. Ogni pagina esiste in italiano (`/`) e in inglese (`/en/`).

| # | Sezione | Contenuto |
|---|---|---|
| 1 | **Intestazione** | foto, nome, titolo, anni di esperienza, città e disponibilità, frase di valore, pulsanti principali |
| 2 | **Progetti** | progetto in evidenza (Balloi) con gli episodi video; schede degli altri progetti |
| 3 | **Esperienza e formazione** | linea del tempo delle esperienze lavorative e della formazione |
| 4 | **Certificazioni** | elenco con anteprima, visualizzazione, download del PDF e verifica |
| 5 | **Competenze** | raggruppate per ruolo, ognuna collegata a dove è dimostrata |
| 6 | **Come lavoro** | runbook, ADR, diario: il metodo |
| 7 | **Contatti** | modulo contatti, email, LinkedIn, GitHub |
| — | **Dettaglio progetto** | architettura con diagramma, episodi video, problemi e soluzioni, tecnologie, link |

Indirizzi delle pagine: `/`, `/progetti/balloi-immobiliare`, `/en/`, `/en/projects/balloi-immobiliare` (e così per i progetti successivi).

## 5. Requisiti funzionali

Ogni requisito ha un codice (RF-xx) e i **criteri di accettazione**.

### Intestazione e navigazione

**RF-01 — Intestazione.** Foto, nome, titolo, "3+ anni in release e deployment", badge AWS Solutions Architect, città e disponibilità (in sede a Cagliari · ibrido · full remote), frase di valore.
- Criterio: tutto visibile senza scorrere, anche su uno schermo di 360 px.

**RF-02 — Pulsanti principali.** Scarica CV (PDF, nella lingua corrente), GitHub, LinkedIn, Email.
- Criterio: il CV si scarica con un clic; i link esterni si aprono in una nuova scheda; l'indirizzo email è anche copiabile con un pulsante.

**RF-03 — Menu.** Porta alle sezioni; resta visibile in alto mentre si scorre; su telefono diventa un menu a scomparsa.

**RF-04 — Lingua.** Pulsante IT / EN che porta alla stessa pagina nell'altra lingua.
- Criteri: ogni lingua ha il suo indirizzo condivisibile; alla prima visita si propone la lingua del browser; la scelta viene ricordata.

### Progetti e video

**RF-05 — Progetto in evidenza.** Balloi immobiliare in grande: tipo di architettura ("Server singolo · API REST"), problema → cosa ho fatto → risultato in numeri (3 righe), tecnologie come etichette, link a repository, diario, ADR e dettaglio.

**RF-06 — Carosello degli episodi.** I video sono episodi in un carosello **a scorrimento manuale** (frecce, puntini, titolo e durata di ogni episodio visibili).
- Criteri: nessuno scorrimento automatico; si usa con la tastiera e con lo swipe.

**RF-07 — Riproduzione video.** Clic su un episodio → il video parte **senza audio**, con **sottotitoli incisi**; l'utente può attivare l'audio.
- Criteri: copertina con titolo prima dell'avvio; nessun video parte da solo con l'audio; un solo video in riproduzione alla volta.

**RF-08 — Schede degli altri progetti.** Titolo, tipo di architettura, una riga di descrizione, etichette, stato ("online" o "in lavorazione"), link al dettaglio.

**RF-09 — Pagina di dettaglio progetto.** Diagramma dell'architettura (in stile blueprint), video di architettura, tutti gli episodi, problemi incontrati e soluzioni, tecnologie, link a GitHub, diario e ADR.

### Esperienza e formazione

**RF-10 — Linea del tempo.** Voci in ordine dalla più recente: ruolo, azienda, luogo, periodo, 3-5 punti sulle attività e le competenze. Separazione visiva tra esperienza e formazione.
- Criterio: la voce più recente è aperta, le altre si possono espandere.

### Certificazioni

**RF-11 — Elenco certificazioni.** Nome, ente, data di rilascio, scadenza, anteprima (prima pagina del PDF), pulsante "Verifica" verso la credenziale ufficiale.
- Certificazioni della prima versione: AWS Certified Solutions Architect – Associate; Certified Associate in Project Management (CAPM); Qualifica professionale Sviluppatore Software – Java.

**RF-12 — Visualizzazione e download.** Clic sull'anteprima → il PDF si apre nel browser; pulsante per scaricarlo. Funziona anche da telefono.

**RF-13 — Stato.** Una certificazione può apparire come "in preparazione", con la data prevista.

### Competenze e metodo

**RF-14 — Competenze collegate alle prove.** Raggruppate per ruolo (DevOps, Cloud, Infrastruttura, Release). Ogni competenza porta a dove è dimostrata: esperienza lavorativa, progetto, episodio, file su GitHub, certificazione.
- Criterio: nessuna barra percentuale o valutazione autoassegnata.

**RF-15 — Come lavoro.** Tre schede (runbook, ADR, diario), ognuna con un esempio reale e il link.

### Contatti

**RF-16 — Modulo contatti.** Campi: nome, email, messaggio, casella di consenso con link all'informativa.
- Criteri: controlli sui campi prima dell'invio; conferma chiara dopo l'invio; in caso di errore, messaggio comprensibile con l'email come alternativa.

**RF-17 — Notifica a Daniel.** Ogni messaggio arriva a Daniel via email (SES) e viene salvato per **12 mesi**, poi cancellato in automatico.

**RF-18 — Protezione anti-spam.** Limite di invii ripetuti, campo nascosto contro i bot, lunghezza massima dei campi. Nessun CAPTCHA.

### Aggiornamento dei contenuti (Daniel)

**RF-19 — Pubblicazione automatica dei video.** Daniel carica nel bucket di caricamento il video e un piccolo file di informazioni (progetto, numero e titolo dell'episodio in IT/EN) → il sistema elabora il video (compressione, copertina) → l'episodio compare nel carosello **senza modificare il codice né rifare il deploy**.
- Criteri: in caso di errore il video non viene pubblicato e Daniel riceve un avviso; ricaricare lo stesso file non crea doppioni.

**RF-20 — Pubblicazione automatica delle certificazioni.** Stesso meccanismo: PDF + file di informazioni → anteprima generata → certificazione nell'elenco.

**RF-21 — Aggiornamento del sito.** Ogni modifica inviata su GitHub viene pubblicata in automatico.

### Condivisione e informazioni legali

**RF-22 — Anteprima sui social.** Ogni pagina ha titolo, descrizione e immagine di condivisione nella lingua giusta, **già presenti nell'HTML** (LinkedIn non esegue JavaScript).

**RF-23 — Informativa privacy.** Pagina breve: quali dati raccoglie il modulo, perché, per quanto tempo, come chiederne la cancellazione. Nessun cookie di tracciamento.

## 6. Flussi principali

**Recruiter HR, 60 secondi.** Apre il link da LinkedIn → vede titolo, esperienza e certificazione AWS → guarda un episodio da 30 secondi, anche senza audio → scarica il CV.

**Tecnico, 5 minuti.** Apre il sito → legge l'architettura di Balloi → guarda 2-3 episodi → pagina di dettaglio → GitHub, un ADR e il runbook → verifica la certificazione AWS.

**Invio di un contatto.** Compila il modulo → vede la conferma → Daniel riceve l'email.

**Daniel aggiunge un video o una certificazione.** Carica i file → pochi minuti dopo li trova sul sito.

## 7. Contenuti (stato)

| Contenuto | Stato |
|---|---|
| Foto professionale | da preparare (sfondo neutro, formato quadrato) |
| Testi di presentazione IT/EN | bozza nel file `contenuti-sito.md`, da rivedere |
| Esperienza e formazione | fornite da LinkedIn il 25/9 (vedi `contenuti-sito.md`) |
| CV in PDF, italiano e inglese | da preparare |
| PDF delle certificazioni | da preparare, **controllando che non contengano dati personali** oltre al nome |
| Link di verifica delle certificazioni | da copiare da LinkedIn ("Mostra credenziale") |
| Video degli episodi | dal Giorno 11 di Balloi |
| Link GitHub, LinkedIn, email | da confermare |

## 8. Requisiti non funzionali

| Area | Requisito |
|---|---|
| **Prestazioni** | prima schermata in meno di 2 secondi; Lighthouse ≥ 90 in prestazioni, accessibilità, SEO |
| **Telefono** | tutto utilizzabile da 360 px di larghezza |
| **Accessibilità** | obiettivo WCAG AA: contrasti, tastiera, testi alternativi, sottotitoli, rispetto di "riduci animazioni" |
| **Privacy (GDPR)** | nessun cookie di tracciamento; informativa; messaggi cancellati dopo 12 mesi |
| **Sicurezza** | nessun segreto nel codice; CORS limitato a `https://danielballoi.github.io`; bucket privati tramite CloudFront; permessi minimi per ogni Lambda; accesso da GitHub ad AWS con OIDC |
| **Costi** | nelle soglie gratuite; budget AWS con avvisi; limiti contro gli abusi |
| **Affidabilità** | eventi falliti in una coda degli errori con avviso; il sito funziona anche se AWS non risponde (dati di riserva nel sito, email al posto del modulo) |
| **Manutenibilità** | infrastruttura in Terraform; pubblicazione automatica; README, ADR, runbook e diario come in Balloi |

## 9. Aspetto grafico: "Blueprint tecnico"

- Il sito ricorda un **disegno tecnico di architettura**: sfondo carta chiara con una **griglia sottile**, linee e connettori che collegano le sezioni come in un diagramma, didascalie tecniche in carattere monospazio.
- Colore principale **blu inchiostro**; un solo colore d'accento caldo, usato con parsimonia per le azioni principali.
- Tema scuro "blueprint notturno" (sfondo blu profondo, linee chiare), che segue le preferenze del sistema.
- Caratteri: una famiglia tecnica con varianti coordinate (es. IBM Plex Sans / Sans Condensed / Mono).
- Diagrammi di architettura disegnati nello stesso stile (SVG), usati nelle pagine di dettaglio.
- Animazioni leggere: le linee dei diagrammi "si disegnano" all'ingresso, disattivate con "riduci animazioni".

## 10. Architettura tecnica

| Livello | Tecnologia |
|---|---|
| Pagine | **React + Vite**, con **pre-rendering statico** di ogni pagina e lingua (HTML già completo per SEO e anteprime LinkedIn) |
| Hosting delle pagine | **GitHub Pages**, repository pubblico `danielballoi.github.io` |
| Pubblicazione | GitHub Actions (build, test, pubblicazione) |
| Video, copertine, certificazioni, catalogo | S3 privato + CloudFront (Origin Access Control) |
| Logica | **Lambda in Node.js 22** |
| Eventi | EventBridge + SQS con coda degli errori |
| Dati | DynamoDB (catalogo, messaggi con scadenza automatica a 12 mesi) |
| Modulo contatti | API Gateway (HTTP API) |
| Email | **SES** (indirizzo di Daniel verificato) |
| Infrastruttura come codice | **Terraform** |
| Accesso da GitHub ad AWS | OIDC con ruolo IAM, senza chiavi statiche |

**Repository unico** `danielballoi.github.io`:
```
site/        pagine React + Vite
functions/   Lambda in Node.js 22
infra/       Terraform
docs/        README, ADR, runbook, diario
.github/     workflow di GitHub Actions
```

### Catalogo degli eventi

| Evento | Chi lo genera | Chi reagisce | Cosa succede |
|---|---|---|---|
| `VideoCaricato` | S3 (bucket di caricamento) | Lambda di elaborazione video | compressione, copertina, salvataggio nel bucket pubblico |
| `VideoPubblicato` | Lambda di elaborazione | Lambda del catalogo | aggiornamento del catalogo; il sito mostra l'episodio |
| `CertificatoCaricato` | S3 (bucket di caricamento) | Lambda delle certificazioni | anteprima del PDF, aggiornamento del catalogo |
| `ContattoRicevuto` | Lambda del modulo | Lambda di salvataggio e Lambda email | salvataggio (12 mesi) e email a Daniel |
| `ElaborazioneFallita` | coda degli errori | allarme CloudWatch | email di avviso a Daniel |

## 11. Fuori perimetro della prima versione

Blog; statistiche delle visite; area riservata con login; dominio a pagamento (migrazione futura a S3 + CloudFront possibile); commenti o chat.

## 12. Piano di costruzione

1. **Sito** con Claude Code (prompt 1): pagine, contenuti, stile, lingue, pubblicazione su GitHub Pages. Funziona subito con dati di esempio.
2. **Infrastruttura** (prompt 2), passo per passo e spiegata: Terraform, bucket, CloudFront, pipeline a eventi, modulo contatti, OIDC.
3. **Collegamento**: il sito legge il catalogo da CloudFront e invia il modulo ad API Gateway.
4. **Contenuti veri**: foto, CV, certificazioni, video.
5. **Test** (Lighthouse, telefono, accessibilità), documentazione e pubblicazione del link su LinkedIn.
