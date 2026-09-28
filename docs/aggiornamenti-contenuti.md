# Aggiornamenti ai contenuti (28/9/2026) — prevalgono su analisi e contenuti-sito

Dove questo file contraddice `analisi-funzionale-portfolio-v1.md` o `contenuti-sito.md`, vale questo file.

## 1. Competenze con stelle e loghi (sostituisce RF-14)

- Ogni tecnologia ha: **logo ufficiale**, nome, **valutazione da 1 a 5 stelle**, link "dove è dimostrata".
- **Legenda sempre visibile** sopra l'elenco:
  - IT: ★ basi teoriche · ★★ lo uso con una guida · ★★★ lo uso da solo nei casi comuni · ★★★★ ci ho costruito un progetto completo · ★★★★★ lo uso in produzione da anni
  - EN: ★ theory · ★★ with guidance · ★★★ on my own for common tasks · ★★★★ built a complete project with it · ★★★★★ used in production for years
- Loghi dal pacchetto npm `simple-icons` (licenza CC0), SVG inline, monocromatici nel colore inchiostro del tema; colore del marchio solo al passaggio del mouse. Per le voci senza logo (es. Change Management) un'icona tecnica disegnata nello stile blueprint, niente emoji.
- Stelle accessibili: `aria-label="4 su 5"` / `"4 out of 5"`.
- Dati in `site/src/content/skills.json`. **Valori provvisori**, Daniel li confermerà:

| Gruppo | Tecnologia | Livello | Dove è dimostrata |
|---|---|---|---|
| Release | Rilasci in produzione | 5 | Esperienza Stackhouse (Mooney) |
| Release | Esecuzione e monitoraggio pipeline CI/CD | 4 | Stackhouse; Balloi episodio 3 |
| Release | Rilasci su database MySQL | 4 | Stackhouse (Mooney) |
| Release | Change Management | 4 | Stackhouse; certificazione CAPM |
| Release | Jira · ServiceNow | 4 | Stackhouse |
| DevOps | GitHub Actions | 3 | Balloi episodio 3 e 7 |
| DevOps | Docker · Docker Compose | 3 | Balloi episodio 2 |
| DevOps | Git | 3 | repository Balloi |
| Cloud | AWS (EC2, S3, IAM) | 3 | Balloi episodio 4; certificazione AWS SAA |
| Cloud | Terraform | 3 | Balloi episodio 4 |
| Cloud | AWS Lambda · EventBridge | 2 | questo sito (fase 2) |
| Sistemi | Linux · Bash | 3 | Balloi episodio 5 |
| Sistemi | Nginx | 2 | Balloi episodio 2 |
| Dati | SQL · PL/SQL | 3 | Stackhouse (EdenRed); Balloi |
| Dati | MongoDB | 2 | Stackhouse (Alcor) |
| Sviluppo | Java · Spring Boot | 3 | Stackhouse (Sisal); stage Televideocom |
| Sviluppo | JavaScript · React | 3 | Stackhouse (Alcor); Balloi |
| Sviluppo | Node.js · Express | 2 | Balloi |
| Metodo | Project management | 4 | Stackhouse (PMO); CAPM |

## 2. Esperienza — Stackhouse (sostituisce il testo in contenuti-sito)

**Release Specialist | Software Developer — Stackhouse S.r.l. (gruppo Spindox)** · Cagliari · gen 2023 – giu 2026

Importante: l'esperienza **pratica** è su rilasci, pipeline CI/CD (lancio e monitoraggio) e rilasci su database MySQL **on-premise**. Sul cloud AWS Daniel ha avuto un ruolo di **coordinamento come PMO**, non esecutivo. Non scrivere mai che ha gestito in prima persona AWS o il cloud a Stackhouse.

Progetti (IT / EN):

- **Mooney** · Release e PMO / Release and PMO · apr 2023 – mag 2026
  - IT: Esecuzione dei rilasci in produzione: lancio delle pipeline CI/CD e rilascio su database MySQL on-premise, con verifica post-rilascio. Presidio e censimento dei rilasci; gestione delle Change Request e valutazione dei rischi con Dev, QA e Ops. Pianificazione (Jira, ServiceNow, Excel) e Application Management. Coordinamento, come PMO, delle attività cloud AWS svolte dai team tecnici.
  - EN: Carried out production releases: ran CI/CD pipelines and released to on-premise MySQL databases, with post-release checks. Tracked and oversaw releases; managed Change Requests and risk assessment with Dev, QA and Ops. Planning (Jira, ServiceNow, Excel) and application management. Coordinated, as PMO, the AWS cloud activities carried out by the engineering teams.
- **Alcor** · Developer · feb 2026 – giu 2026
  - IT: Sviluppo di un software end-to-end in JavaScript e React con Flowerbase e MongoDB, con sviluppo assistito da AI (Claude Code).
  - EN: Built end-to-end software in JavaScript and React with Flowerbase and MongoDB, using AI-assisted development (Claude Code).
- **Italgas** · PMO · dic 2024 – giu 2025
  - IT: Gestione della realizzazione di un software end-to-end: pianificazione, avanzamento e coordinamento del team.
  - EN: Managed the delivery of end-to-end software: planning, progress tracking and team coordination.
- **Sisal** · Developer · feb 2023 – mag 2023
  - IT: Analisi e Application Maintenance in Java / Spring Boot. — EN: Analysis and application maintenance in Java / Spring Boot.
- **EdenRed** · Developer · gen 2023 – mar 2023
  - IT: Application Maintenance su database con SQL e PL/SQL. — EN: Database application maintenance with SQL and PL/SQL.

Riga di esperienza nell'intestazione — IT: "3 anni e mezzo di rilasci in produzione per clienti Enterprise" — EN: "3.5 years of production releases for enterprise clients".

## 3. Formazione e lingue

- Diploma di Ragioneria – indirizzo turistico, ITC "Pietro Martini", Cagliari (EN: High School Diploma in Accounting – Tourism specialisation).
- Lingue: Italiano madrelingua · Inglese B2 (13 mesi di lavoro a Londra) · Spagnolo base.
- Disponibilità: Cagliari · in sede, ibrido o full remote · disponibile a trasferte · automunito · disponibile al lavoro notturno.
- Contatti: danielballoi1995@outlook.it · linkedin.com/in/danielballoi · github.com/danielballoi. Il numero di telefono **non** va pubblicato sul sito (solo nel CV PDF).

## 4. Sezione personale "Fuori dal lavoro" / "Beyond work"

Nuova sezione breve prima dei contatti: 2-3 righe di testo e una foto facoltativa. **Testo da fornire**: usa un segnaposto evidente.

## 5. Episodi video di Balloi (veri, già pronti)

In `materiali/video/`: `balloi-ep1.mp4` … `balloi-ep7.mp4` (1920×1080, 27-38 secondi, voce e sottotitoli già incisi) e le copertine `balloi-epN-copertina.jpg`. In questa fase copiali in `site/public/video/` e usali come dati locali del catalogo (in fase 2 passeranno su S3 + CloudFront).

| N | Titolo IT | Titolo EN | Durata |
|---|---|---|---|
| 1 | L'app | The app | 0:33 |
| 2 | Docker | Docker | 0:30 |
| 3 | La pipeline CI/CD | The CI/CD pipeline | 0:28 |
| 4 | Infrastruttura come codice | Infrastructure as code | 0:36 |
| 5 | Diagnosi di un problema reale | Troubleshooting a real problem | 0:38 |
| 6 | Sicurezza | Security | 0:31 |
| 7 | Le release | Releases | 0:31 |

I sottotitoli sono in italiano; per la versione inglese mostra gli stessi video con una nota "Voice and subtitles in Italian".

## 6. Certificazioni sul sito (dati reali, PDF in materiali/certificazioni/)

| Certificazione | Ente | Rilascio | Scadenza | PDF | Verifica |
|---|---|---|---|---|---|
| AWS Certified Solutions Architect – Associate | Amazon Web Services | 18 set 2026 | 18 set 2029 | aws-solutions-architect-associate.pdf | https://aws.amazon.com/verification (codice di convalida 0db041925ffa4c3ba6b39006d739b0f5) |
| Certified Associate in Project Management (CAPM), "Above Target" in tutti i domini | Project Management Institute | 4 mag 2026 | 4 mag 2029 | capm.pdf | registro PMI: https://www.pmi.org/certifications/certification-resources/registry (n. 4370486) |
| Qualifica professionale "Tecnico di Sviluppo Software" (EQF 5) | Regione Autonoma della Sardegna (agenzia formativa ABACONS) | 7 dic 2022 | — | qualifica-tecnico-sviluppo-software.pdf | — |

- Il PDF della qualifica è già privo della pagina con i dati personali: **non** cercare né pubblicare altre versioni.
- Anteprima: genera un'immagine della prima pagina di ogni PDF in fase di build (o una volta, come file statico).
- Se Daniel fornirà i link "Mostra credenziale" di LinkedIn/Credly, sostituiranno quelli sopra.
- Le formazioni Anthropic/Claude **non** vanno nel sito.
