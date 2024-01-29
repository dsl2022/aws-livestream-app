# Outputs
output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.ivs_app_user_pool.id
}

output "cognito_user_pool_client_id" {
  value = aws_cognito_user_pool_client.ivs_app_client.id
}

# Outputs
output "cognito_identity_pool_id" {
  value = aws_cognito_identity_pool.ivs_app_identity_pool.id
}

output "ingest_endpoint" {
  value = aws_ivs_channel.ivs_app.ingest_endpoint
}

output "stream_key" {
  value = data.aws_ivs_stream_key.ivs_app.value
}

output "playback_url" {
  value = aws_ivs_channel.ivs_app.playback_url
}

output "bucketname" {
  value = aws_s3_bucket.ivs_app.bucket_domain_name
}

output "ivs_serve_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.web_distribution_ivs_serve.domain_name
}

output "ivs_app_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.web_distribution_ivs_app.domain_name
}