output "state_bucket_name" {
  description = "Bucket da usare come backend negli altri progetti Terraform"
  value       = aws_s3_bucket.state.bucket
}
output "github_actions_role_arn" {
  description = "ARN del ruolo da usare nella pipeline (aws-actions/configure-aws-credentials)"
  value       = aws_iam_role.github_actions.arn
}
