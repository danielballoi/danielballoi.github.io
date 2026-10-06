terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0" # provider AWS, versione 6.x
    }
    archive = {
      source  = "hashicorp/archive" # provider per creare file zip
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = "eu-south-1"
}
