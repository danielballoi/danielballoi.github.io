variable "state_bucket_name" {
  description = "Nome del bucket S3 per lo state di Terraform (unico al mondo)"
  type        = string
}

variable "budget_email" {
  description = "Email che riceve gli avvisi del budget"
  type        = string
}

variable "budget_limit_usd" {
  description = "Spesa mensile massima prevista, in dollari"
  type        = string
  default     = "1.0" # valore predefinito: 1 dollaro al mese
}
