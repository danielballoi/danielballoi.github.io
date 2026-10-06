# ═════════ LAMBDA "pubblica-progetto" ═════════
# Legge progetti/<slug>.json dal bucket upload, lo valida e fa il commit su GitHub.

# ───────── 1. Lo ZIP del codice (data = calcolato, non crea nulla su AWS) ─────────
data "archive_file" "pubblica_progetto" {
  type        = "zip"
  source_dir  = "${path.module}/../../functions/pubblica-progetto"
  output_path = "${path.module}/build/pubblica-progetto.zip"
  excludes    = ["test", "events", "progetti", "PER-IL-DEVOPS.md"] # nello zip solo index.mjs + src/
}

# ───────── 2. Il LOG GROUP, creato PRIMA della Lambda ─────────
# Se lo creasse la Lambda da sola, terrebbe i log PER SEMPRE e Terraform non lo gestirebbe.
resource "aws_cloudwatch_log_group" "pubblica_progetto" {
  name              = "/aws/lambda/${local.lambda_name}"
  retention_in_days = 14
}

# ───────── 3. La LAMBDA ─────────
resource "aws_lambda_function" "pubblica_progetto" {
  function_name = local.lambda_name                # "pubblica-progetto"
  role          = aws_iam_role.lambda_pubblica.arn # la "tessera" di lambda-iam.tf
  runtime       = "nodejs22.x"
  handler       = "index.handler" # file index.mjs, funzione handler
  architectures = ["arm64"]       # Graviton: costa meno, ok per Node puro

  filename         = data.archive_file.pubblica_progetto.output_path
  source_code_hash = data.archive_file.pubblica_progetto.output_base64sha256
  # impronta dello zip: se il codice cambia → Terraform ricarica la Lambda

  memory_size = 128
  timeout     = 30

  environment {
    variables = {
      GITHUB_REPO        = "danielballoi/danielballoi.github.io"
      GITHUB_BRANCH      = "main"
      GITHUB_TOKEN_PARAM = local.token_param # il NOME del parametro, non il token
      TARGET_DIR         = "site/src/content/progetti"
    }
  }

  # prima log group e permessi, poi la Lambda
  depends_on = [
    aws_cloudwatch_log_group.pubblica_progetto,
    aws_iam_role_policy.lambda_pubblica,
  ]
}
