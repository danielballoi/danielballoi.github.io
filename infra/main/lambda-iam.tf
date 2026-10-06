# ═════════ RUOLO IAM DELLA LAMBDA "pubblica-progetto" ═════════
# La Lambda gira "indossando" questo ruolo: può fare SOLO quello che è scritto qui.

locals {
  account_id  = "576134963750"
  region      = "eu-south-1"
  lambda_name = "pubblica-progetto"
  token_param = "/portfolio/github-token" # solo il NOME del parametro, mai il token
}

# ───────── 1. Il ruolo + TRUST POLICY: chi può indossarlo ─────────
resource "aws_iam_role" "lambda_pubblica" {
  name = "${local.lambda_name}-lambda" # → "pubblica-progetto-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" } # SOLO il servizio Lambda
      Action    = "sts:AssumeRole"                     # "indossare il ruolo"
    }]
  })
}

# ───────── 2. PERMISSION POLICY: cosa può fare ─────────
resource "aws_iam_role_policy" "lambda_pubblica" {
  name = "${local.lambda_name}-permessi"
  role = aws_iam_role.lambda_pubblica.id # attaccata al ruolo qui sopra

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "LeggiProgettiCaricati"
        Effect   = "Allow"
        Action   = "s3:GetObject"                           # solo leggere
        Resource = "${aws_s3_bucket.upload.arn}/progetti/*" # solo questa "cartella"
      },
      {
        Sid      = "LeggiTokenGithub"
        Effect   = "Allow"
        Action   = "ssm:GetParameter" # solo leggere, non modificare
        Resource = "arn:aws:ssm:${local.region}:${local.account_id}:parameter${local.token_param}"
        # il nome inizia già con "/" → niente "/" dopo "parameter"
      },
      {
        Sid      = "ScriviLog"
        Effect   = "Allow"
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:${local.region}:${local.account_id}:log-group:/aws/lambda/${local.lambda_name}:*"
        # niente logs:CreateLogGroup: il log group lo crea Terraform (punto 4),
        # così decido io la conservazione (14 giorni) e non resta "per sempre"
      }
    ]
  })
}
