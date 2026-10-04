output "state_bucket_name" {
  description = "Bucket da usare come backend negli altri progetti Terraform"
  value       = aws_s3_bucket.state.bucket
}
