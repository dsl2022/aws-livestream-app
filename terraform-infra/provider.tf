terraform {
  required_version = ">= 0.12"
   backend "s3" {}
}

provider "aws" {
  region = "us-east-1"
}
