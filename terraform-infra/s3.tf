resource "aws_s3_bucket" "web_bucket" {
  bucket = var.bucket_name # Replace with your desired bucket name
  tags = {
    Name = "Ivs livestream app"
  }
}