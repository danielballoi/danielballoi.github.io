resource "aws_lambda_permission" "consenti_invocazione_s3" {
  statement_id  = "AllowExecutionFromS3"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pubblica_progetto.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.upload.arn
}

resource "aws_s3_bucket_notification" "notifica_progetti" {
  bucket = aws_s3_bucket.upload.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.pubblica_progetto.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "progetti/"
    filter_suffix       = ".json"
  }

  depends_on = [aws_lambda_permission.consenti_invocazione_s3]
}
