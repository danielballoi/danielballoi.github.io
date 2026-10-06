output "media_bucket" {
  value = aws_s3_bucket.media.bucket
}

output "cloudfront_domain" {
  description = "Indirizzo da cui il sito caricherà video e immagini"
  value       = aws_cloudfront_distribution.media.domain_name
}
output "upload_bucket" {
  value = aws_s3_bucket.upload.id # il nome del bucket, per caricare i file di prova
}

output "lambda_name" {
  value = aws_lambda_function.pubblica_progetto.function_name
}
