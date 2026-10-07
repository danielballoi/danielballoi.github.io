# Coda che riceve gli eventi falliti dell'invocazione asincrona della Lambda
resource "aws_sqs_queue" "dlq_pubblica_progetto" {
  name                      = "pubblica-progetto-dlq"
  message_retention_seconds = 1209600 # 14 giorni: tempo per indagare con calma
}

# Dice alla Lambda: se un'invocazione asincrona fallisce (dopo i retry automatici),
# manda l'evento in questa coda invece di perderlo
resource "aws_lambda_function_event_invoke_config" "pubblica_progetto_retry" {
  function_name = aws_lambda_function.pubblica_progetto.function_name

  destination_config {
    on_failure {
      destination = aws_sqs_queue.dlq_pubblica_progetto.arn
    }
  }
}

# Permesso: il ruolo di esecuzione della Lambda deve poter scrivere nella coda
resource "aws_iam_role_policy" "permetti_invio_dlq" {
  name = "permetti-invio-dlq"
  role = aws_iam_role.lambda_pubblica.id # <-- da verificare col grep sopra

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "sqs:SendMessage"
      Resource = aws_sqs_queue.dlq_pubblica_progetto.arn
    }]
  })
}

# Topic SNS per l'email di allarme
resource "aws_sns_topic" "allarmi_portfolio" {
  name = "portfolio-allarmi"
}

resource "aws_sns_topic_subscription" "email_allarmi_portfolio" {
  topic_arn = aws_sns_topic.allarmi_portfolio.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# Allarme: se finisce almeno 1 messaggio nella DLQ, qualcosa è fallito -> avvisami
resource "aws_cloudwatch_metric_alarm" "dlq_non_vuota" {
  alarm_name  = "pubblica-progetto-dlq-non-vuota"
  namespace   = "AWS/SQS"
  metric_name = "ApproximateNumberOfMessagesVisible"
  dimensions = {
    QueueName = aws_sqs_queue.dlq_pubblica_progetto.name
  }
  statistic           = "Maximum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  alarm_description   = "La Lambda pubblica-progetto ha fallito un'invocazione (vedi coda DLQ)"
  alarm_actions       = [aws_sns_topic.allarmi_portfolio.arn]
  treat_missing_data  = "notBreaching"
}
