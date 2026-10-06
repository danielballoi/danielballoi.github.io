# ═════════ BUCKET UPLOAD: la "cassetta delle lettere" per progetto.json ═════════
# Qui carico i file dei progetti; la Lambda li legge e li pubblica su GitHub.
# Deve restare PRIVATO: niente CloudFront, niente bucket policy pubblica.

resource "aws_s3_bucket" "upload" {
  bucket = "danielballoi-portfolio-upload-576134963750"
  # il nome di un bucket è unico in TUTTO AWS → aggiungo l'ID dell'account
  # niente prevent_destroy: se lo perdo, ricarico il file (il vero archivio è Git)
}

# ───────── 1. Nessun accesso pubblico, mai ─────────
resource "aws_s3_bucket_public_access_block" "upload" {
  bucket = aws_s3_bucket.upload.id # riferimento → Terraform crea prima il bucket

  block_public_acls       = true # rifiuta ACL pubbliche nuove
  ignore_public_acls      = true # ignora quelle eventualmente presenti
  block_public_policy     = true # rifiuta bucket policy che aprono a tutti
  restrict_public_buckets = true # anche se una policy pubblica ci fosse, non vale
}

# ───────── 2. Cifratura dei file salvati ─────────
resource "aws_s3_bucket_server_side_encryption_configuration" "upload" {
  bucket = aws_s3_bucket.upload.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256" # SSE-S3: gratis (una chiave KMS costerebbe ~1 $/mese)
    }
  }
}

# ───────── 3. Pulizia automatica dopo 30 giorni ─────────
# Una volta pubblicato su GitHub, il file in S3 serve solo per controlli:
# non lo tengo per sempre (ordine + costi).
resource "aws_s3_bucket_lifecycle_configuration" "upload" {
  bucket = aws_s3_bucket.upload.id

  rule {
    id     = "cancella-dopo-30-giorni"
    status = "Enabled"

    filter {} # filtro vuoto = la regola vale per TUTTO il bucket

    expiration {
      days = 30 # S3 cancella da solo gli oggetti più vecchi di 30 giorni
    }
  }
}
