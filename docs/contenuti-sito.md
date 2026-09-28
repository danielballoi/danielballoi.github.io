# Contenuti del sito portfolio (bozza IT/EN)

Da rivedere con Daniel. Testi pensati per essere brevi e concreti. Da copiare nel repository come base per i file di contenuto (`site/src/content/`).

## Intestazione

- **Nome**: Daniel Balloi
- **Titolo** — IT: DevOps & Release Engineer · AWS Certified Solutions Architect — EN: DevOps & Release Engineer · AWS Certified Solutions Architect
- **Riga di esperienza** — IT: 3+ anni di release e deployment su sistemi mission-critical — EN: 3+ years of releases and deployments on mission-critical systems
- **Frase di valore** — IT: Porto le applicazioni dal codice alla produzione in modo affidabile: pipeline CI/CD, cloud AWS, infrastruttura come codice e rilasci controllati. — EN: I take applications from code to production, reliably: CI/CD pipelines, AWS cloud, infrastructure as code and controlled releases.
- **Disponibilità** — IT: Cagliari · in sede, ibrido o full remote — EN: Cagliari, Italy · on-site, hybrid or fully remote
- **Pulsanti**: Scarica CV / Download CV · GitHub · LinkedIn · Email

## Esperienza

### Release Specialist | Software Developer — Stackhouse
- Cagliari · a tempo pieno · gen 2023 – giu 2026 (3 anni e 6 mesi)
- IT:
  - Coordinamento dell'intero ciclo di release (build, test, deploy) per applicazioni mission-critical di clienti Enterprise e Banking.
  - Pipeline CI/CD su AWS e deployment su infrastrutture ibride (on-premise + AWS).
  - Automazione dei processi di deployment con i team di sviluppo e operations, riducendo le attività manuali.
  - Gestione operativa di database MySQL on-premise e cloud, con validazione post-release.
  - Gestione delle Change Request, valutazione dei rischi e coordinamento tra Dev, QA e Ops; ponte con il business.
  - Monitoraggio delle infrastrutture e affidabilità dei servizi in produzione.
- EN:
  - Owned the full release lifecycle (build, test, deploy) for mission-critical applications of Enterprise and Banking clients.
  - CI/CD pipelines on AWS and deployments on hybrid infrastructure (on-premise + AWS).
  - Automated deployment processes with development and operations teams, reducing manual work.
  - Operated MySQL databases on-premise and in the cloud, including post-release validation.
  - Managed Change Requests, risk assessment and coordination between Dev, QA and Ops; bridge to the business.
  - Infrastructure monitoring and reliability of production services.
- Competenze: JavaScript, Java, CI/CD, AWS, MySQL, release management, change management

### Stage Sviluppatore Software Backend — Televideocom Srl
- Cagliari · stage · ott 2022 – dic 2022 (3 mesi)
- IT: Progetto backend end-to-end sviluppato in autonomia: progettazione logica, implementazione, gestione del ciclo di sviluppo. Java e Spring.
- EN: Independently built an end-to-end backend project: logical design, implementation and development lifecycle. Java and Spring.

### Bartender — Stonegate Group
- Londra, Regno Unito · a tempo pieno · apr 2018 – mag 2019 (1 anno e 2 mesi)
- IT: Lavoro in un contesto internazionale ad alto ritmo: inglese quotidiano, gestione della pressione, lavoro di squadra.
- EN: Fast-paced international environment: daily English, working under pressure, teamwork.

## Formazione e certificazioni

| Certificazione | Ente | Rilascio | Scadenza |
|---|---|---|---|
| AWS Certified Solutions Architect – Associate | Amazon Web Services | set 2026 | set 2029 |
| Certified Associate in Project Management (CAPM) | Project Management Institute | mag 2026 | mag 2029 |
| Qualifica professionale Sviluppatore Software – Java | Regione Autonoma della Sardegna | nov 2022 | — |

Note: CAPM con risultato "Above Target" in tutti e 5 i domini. Link di verifica: da copiare da LinkedIn ("Mostra credenziale"). Le certificazioni Anthropic non vanno pubblicate (scelta di Daniel).

## Progetto in evidenza: Balloi immobiliare

- **Tipo** — IT: Server singolo · API REST — EN: Single server · REST API
- **Problema** — IT: Una dashboard di investimenti immobiliari su Cagliari da portare in produzione in modo professionale, a costo quasi zero. — EN: A real-estate investment dashboard for Cagliari, to be taken to production professionally at near-zero cost.
- **Cosa ho fatto** — IT: Container Docker, CI/CD con GitHub Actions, release versionate, infrastruttura AWS in Terraform, avvio automatico con cloud-init, backup su S3, sicurezza della supply chain. — EN: Docker containers, CI/CD with GitHub Actions, versioned releases, AWS infrastructure in Terraform, automatic boot with cloud-init, S3 backups, supply chain security.
- **Risultati** — IT: nuovo server online da solo in 2 minuti · 93 → 0 vulnerabilità · 2 incidenti reali risolti — EN: new server online by itself in 2 minutes · 93 → 0 vulnerabilities · 2 real incidents solved
- **Tecnologie**: Docker, GitHub Actions, Terraform, AWS EC2, S3, IAM, Node.js, React, MySQL
- **Link**: https://github.com/danielballoi/balloi-immobiliare · diario: docs/PORTFOLIO.md · ADR: docs/decisioni/

### Episodi (titoli IT / EN)
1. Cosa ho costruito / What I built
2. Funziona sul mio PC / It works on my machine
3. Un controllore automatico / An automatic gatekeeper
4. Ho cancellato il server per sbaglio / I deleted the server by mistake
5. Il server che non partiva / The server that wouldn't start
6. 93 allarmi / 93 alerts
7. (facoltativo) Come rilascio una nuova versione / How I ship a new version

## Altri progetti (schede "in lavorazione")

- **Questo sito** — IT: Portfolio event-driven e serverless: video e certificazioni pubblicati da soli con eventi, code e Lambda. — EN: Event-driven, serverless portfolio: videos and certifications published automatically through events, queues and Lambda. Tipo: Event-driven · Serverless.
- **Kubernetes e GitOps** — IT: Microservizi su Kubernetes con rilasci GitOps tramite Argo CD, promozione e rollback. — EN: Microservices on Kubernetes with GitOps releases via Argo CD, promotion and rollback. Tipo: Kubernetes · GitOps.
- **Automazione di server Linux** — IT: Una flotta di server configurata e messa in sicurezza con Ansible. — EN: A fleet of servers configured and hardened with Ansible. Tipo: Configuration management.

## Competenze per ruolo (con dove sono dimostrate)

- **DevOps**: CI/CD (GitHub Actions; esperienza Stackhouse), Docker e Compose (Balloi), test automatici (Balloi), sicurezza della supply chain (Balloi, episodio 6).
- **Cloud**: AWS EC2, S3, IAM, Lambda, EventBridge (Balloi, questo sito; certificazione AWS SAA), Terraform (Balloi), controllo dei costi (Balloi).
- **Infrastruttura**: Linux, rete, diagnosi e runbook (Balloi, episodio 5), MySQL on-premise e cloud (Stackhouse), backup e ripristino (Balloi).
- **Release**: ciclo di release e Change Request (Stackhouse), versionamento semantico e release automatiche (Balloi, episodio 7), gestione del rischio e dei progetti (CAPM).

## Come lavoro

- **Runbook** — IT: Procedure scritte per diagnosticare i problemi, dall'esterno verso l'interno. — EN: Written procedures to troubleshoot problems, from the outside in.
- **ADR** — IT: Ogni scelta architetturale è motivata per iscritto, con alternative e compromessi. — EN: Every architectural choice is justified in writing, with alternatives and trade-offs.
- **Diario** — IT: Ogni giornata di lavoro documentata: cosa, perché, cosa ho imparato. — EN: Every working day documented: what, why, what I learned.
