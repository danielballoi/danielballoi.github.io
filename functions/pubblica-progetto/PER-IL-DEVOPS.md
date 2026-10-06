# pubblica-progetto — informazioni per l'infrastruttura

Questo file contiene **solo informazioni**: niente qui viene applicato da solo. Terraform, IAM e pipeline restano da scrivere in `infra/` e `.github/`.

## Cosa fa

Riceve un evento S3 per `progetti/<slug>.json`, legge il file, lo valida con gli stessi campi obbligatori di `docs/come-aggiungere-un-progetto.md` (usati da `site/src/lib/projects.js`) e lo pubblica con un commit nel repository del sito tramite l'API GitHub "contents". Se il file nel repository è già identico non fa nessun commit. In caso di errore lancia un'eccezione, quindi con un'invocazione asincrona (quella di S3) partono i retry e poi la DLQ o la destinazione on-failure.

## Funzione

| Voce | Valore |
|---|---|
| Runtime | `nodejs22.x` |
| Handler | `index.handler` |
| Architettura | indifferente (`arm64` costa meno) |
| Dipendenze | nessuna da installare: `@aws-sdk/client-s3` e `@aws-sdk/client-ssm` sono già inclusi nel runtime |
| Pacchetto | zip della cartella `functions/pubblica-progetto/` così com'è |

Nello zip servono soltanto `index.mjs` e `src/`. Con `archive_file` puoi escludere il resto:

```
excludes = ["test", "events", "progetti", "PER-IL-DEVOPS.md"]
```

Ogni percorso escluso va scritto per intero, senza glob.

## Variabili d'ambiente

Sono tutte obbligatorie. Se ne manca una, la funzione fallisce già all'avvio con `Variabili d'ambiente mancanti: ...`.

| Nome | Valore |
|---|---|
| `GITHUB_REPO` | `danielballoi/danielballoi.github.io` |
| `GITHUB_BRANCH` | `main` |
| `GITHUB_TOKEN_PARAM` | `/portfolio/github-token` |
| `TARGET_DIR` | **`site/src/content/progetti`** (è la cartella letta da `site/src/lib/projects.js` con `import.meta.glob('../content/progetti/*.json')`) |

## Token GitHub (parametro SSM)

- Parametro `SecureString` chiamato `/portfolio/github-token`, da creare a mano (console o CLI) e **non** in Terraform, altrimenti il valore finisce nello state.
- Token consigliato: un *fine-grained personal access token* limitato al solo repository `danielballoi/danielballoi.github.io`, con il permesso **Contents: Read and write** e nient'altro, e con una scadenza.
- La funzione legge il token con `GetParameter` + `WithDecryption`, lo tiene in memoria finché il container resta attivo e lo rilegge se GitHub risponde 401. Il token non viene mai scritto nei log, e se compare in un messaggio d'errore viene sostituito con `***`.

## Permessi IAM minimi del ruolo della Lambda

| Azione | Risorsa | Perché |
|---|---|---|
| `s3:GetObject` | `arn:aws:s3:::<bucket-progetti>/progetti/*` | leggere il file caricato |
| `ssm:GetParameter` | `arn:aws:ssm:eu-south-1:<account-id>:parameter/portfolio/github-token` | leggere il token |
| `kms:Decrypt` | ARN della chiave KMS | **solo** se il parametro usa una chiave gestita da te. Con la chiave AWS predefinita `aws/ssm` non serve |
| `logs:CreateLogStream`, `logs:PutLogEvents` | `arn:aws:logs:eu-south-1:<account-id>:log-group:/aws/lambda/<nome-funzione>:*` | log su CloudWatch |
| `logs:CreateLogGroup` | come sopra | solo se il log group non lo crei tu in Terraform. Consigliato crearlo con `retention_in_days` |
| `sqs:SendMessage` | ARN della DLQ | solo quando aggiungerai la DLQ o la destinazione on-failure |

Non servono `s3:ListBucket`, `ssm:GetParameters`, `ssm:GetParametersByPath` né permessi di scrittura su S3.

## Collegamento S3 → Lambda (da fare in Terraform)

- `aws_s3_bucket_notification`: evento `s3:ObjectCreated:*` con `filter_prefix = "progetti/"` e `filter_suffix = ".json"`.
- `aws_lambda_permission`: `principal = "s3.amazonaws.com"` con `source_arn` (il bucket) e `source_account`.
- Invocazione asincrona (`aws_lambda_function_event_invoke_config`): i retry predefiniti sono 2. Qui puoi impostare `maximum_retry_attempts`, `maximum_event_age_in_seconds` e la destinazione `on_failure` (la DLQ del passo successivo).
- Quando configuri la notifica, S3 invia un `s3:TestEvent`: la funzione lo riconosce e lo ignora senza errore.
- **Concorrenza riservata consigliata: 1.** Due commit simultanei sullo stesso branch possono ricevere da GitHub un 409. Con una sola esecuzione alla volta non succede, e in ogni caso il retry va a buon fine perché la funzione è idempotente.

## Memoria e timeout consigliati

- **Memoria: 128 MB.** Il file è al massimo 100 KB e c'è solo I/O di rete.
- **Timeout: 30 s.** Normalmente bastano 1–3 secondi (S3 + SSM + 2 chiamate GitHub); il margine copre GitHub lento e il cold start.

## Effetti a valle

- Il commit su `main` modifica `site/`, quindi fa partire `.github/workflows/deploy-site.yml` e il sito viene ripubblicato. I commit fatti con un PAT, a differenza di quelli con `GITHUB_TOKEN`, attivano i workflow.
- Se su `main` attivi una branch protection che richiede PR o check, il `PUT` diretto viene rifiutato (errore 409 o 422 nei log).

## Pipeline Terraform

`.github/workflows/terraform.yml` oggi parte solo per `infra/main/**`. Se il codice della Lambda viene zippato da Terraform, la pipeline **deve ripartire anche quando cambia `functions/`**: aggiungi `functions/**` (oppure `functions/pubblica-progetto/**`) a `paths` sia in `pull_request` sia in `push`. Altrimenti una modifica al codice arriva su `main` e la funzione su AWS resta alla versione vecchia.

## Test

Servono Node.js 20 o superiore, nessun `npm install` e nessuna rete (S3, SSM e GitHub sono simulati):

```bash
cd functions/pubblica-progetto
node --test
```

Per un passo di CI si può usare lo stesso comando, con `actions/setup-node` e Node 22.

## Prove a mano (dopo il deploy)

> Attenzione: queste prove pubblicano davvero un progetto "esempio" sul sito. Poi va rimosso dal repository.

```bash
# 1. Evento S3 vero: carica il file nel bucket
aws s3 cp progetti/esempio.json s3://<bucket-progetti>/progetti/esempio.json

# 2. Lancio a mano con l'evento di esempio (sostituisci il nome del bucket nel file)
aws lambda invoke --function-name <nome-funzione> \
  --cli-binary-format raw-in-base64-out \
  --payload file://events/esempio-evento-s3.json risposta.json

# 3. Log (una riga JSON per file: bucket, key, slug, esito, commit)
aws logs tail /aws/lambda/<nome-funzione> --since 10m
```

Rilanciando il passo 2 una seconda volta, il log riporta `"esito":"nessuna modifica"` e su GitHub non compare nessun commit.
