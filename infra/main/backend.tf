terraform {
  backend "s3" {
    bucket       = "danielballoi-portfolio-tfstate-576134963750"
    key          = "main/terraform.tfstate"
    region       = "eu-south-1"
    use_lockfile = true
    encrypt      = true
  }
}

