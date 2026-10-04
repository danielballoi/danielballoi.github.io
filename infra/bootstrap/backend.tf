terraform {
  backend "s3" {
    bucket       = "danielballoi-portfolio-tfstate-576134963750" # il bucket creato al passo 2
    key          = "bootstrap/terraform.tfstate"                 # "percorso" del file dentro il bucket
    region       = "eu-south-1"
    use_lockfile = true # lock nativo su S3 (Terraform ≥ 1.10)
    encrypt      = true # lo state viene salvato cifrato
  }
}

