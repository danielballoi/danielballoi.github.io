# ══════════ BUCKET S3 PER LO STATE DI TERRAFORM ══════════

resource "aws_s3_bucket" "state" {
  bucket = var.state_bucket_name # il nome arriva da terraform.tfvars

  lifecycle {
    prevent_destroy = true # Terraform si RIFIUTA di cancellarlo per errore:
  }                        # perdere lo state = Terraform perde la memoria
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id # si riferisce al bucket creato sopra
  versioning_configuration {
    status = "Enabled" # ogni modifica dello state crea una nuova versione:
  }                    # se lo state si rompe, si torna a quella precedente
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256" # cifratura SSE-S3: gratuita (una chiave KMS costerebbe ~1 $/mese)
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true # le 4 protezioni contro l'accesso pubblico:
  block_public_policy     = true # lo state può contenere dati sensibili,
  ignore_public_acls      = true # non deve MAI essere pubblico
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    id     = "pulizia-versioni-vecchie"
    status = "Enabled"
    filter {} # vale per tutti i file del bucket
    noncurrent_version_expiration {
      noncurrent_days = 90 # le versioni vecchie si cancellano dopo 90 giorni (costi bassi)
    }
    abort_incomplete_multipart_upload {
      days_after_initiation = 7 # elimina i caricamenti interrotti a metà
    }
  }
}

# ══════════ BUDGET: AVVISI SE LA SPESA SUPERA 1 $ ══════════

resource "aws_budgets_budget" "mensile" {
  name         = "portfolio-budget-mensile"
  budget_type  = "COST"               # controlla i costi (non l'utilizzo)
  limit_amount = var.budget_limit_usd # 1.0
  limit_unit   = "USD"
  time_unit    = "MONTHLY" # si azzera ogni mese

  notification { # AVVISO 1: hai già speso il 50% (0,50 $)
    comparison_operator        = "GREATER_THAN"
    threshold                  = 50
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_email]
  }

  notification { # AVVISO 2: hai già speso il 100% (1 $)
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_email]
  }

  notification {                                # AVVISO 3: AWS PREVEDE che a fine mese supererai 1 $
    comparison_operator        = "GREATER_THAN" # è il più utile: arriva PRIMA di spendere
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.budget_email]
  }
}
