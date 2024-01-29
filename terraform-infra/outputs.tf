# Outputs

output "bucketname" {
  value = aws_s3_bucket.ivs_app.bucket_domain_name
}

output "ivs_serve_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.web_distribution_ivs_serve.domain_name
}

output "ivs_app_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.web_distribution_ivs_app.domain_name
}