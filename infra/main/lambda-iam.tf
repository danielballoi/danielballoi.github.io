
locals {
  account_id  = "576134963750"
  region      = "eu-south-1"
  lambda_name = "pubblica-progetto"
  token_param = "/portfolio/github-token"
}

resource "aws_iam_role" "lambda_pubblica" {
  name = "${local.lambda_name}-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "lambda_pubblica" {
  name = "${local.lambda_name}-permessi"
  role = aws_iam_role.lambda_pubblica.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "LeggiProgettiCaricati"
        Effect   = "Allow"
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.upload.arn}/progetti/*"
      },
      {
        Sid      = "LeggiTokenGithub"
        Effect   = "Allow"
        Action   = "ssm:GetParameter"
        Resource = "arn:aws:ssm:${local.region}:${local.account_id}:parameter${local.token_param}"
      },
      {
        Sid      = "ScriviLog"
        Effect   = "Allow"
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:${local.region}:${local.account_id}:log-group:/aws/lambda/${local.lambda_name}:*"
      }
    ]
  })
}
