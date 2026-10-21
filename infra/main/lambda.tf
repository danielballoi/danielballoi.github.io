
data "archive_file" "pubblica_progetto" {
  type        = "zip"
  source_dir  = "${path.module}/../../functions/pubblica-progetto"
  output_path = "${path.module}/build/pubblica-progetto.zip"
  excludes    = ["test", "events", "progetti", "PER-IL-DEVOPS.md"]
}

resource "aws_cloudwatch_log_group" "pubblica_progetto" {
  name              = "/aws/lambda/${local.lambda_name}"
  retention_in_days = 14
}

resource "aws_lambda_function" "pubblica_progetto" {
  function_name = local.lambda_name
  role          = aws_iam_role.lambda_pubblica.arn
  runtime       = "nodejs22.x"
  handler       = "index.handler"
  architectures = ["arm64"]

  filename         = data.archive_file.pubblica_progetto.output_path
  source_code_hash = data.archive_file.pubblica_progetto.output_base64sha256

  memory_size = 128
  timeout     = 30

  environment {
    variables = {
      GITHUB_REPO        = "danielballoi/danielballoi.github.io"
      GITHUB_BRANCH      = "main"
      GITHUB_TOKEN_PARAM = local.token_param
      TARGET_DIR         = "site/src/content/progetti"
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.pubblica_progetto,
    aws_iam_role_policy.lambda_pubblica,
  ]
}
