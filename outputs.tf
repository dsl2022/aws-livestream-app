# Outputs
output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.ivs_app_user_pool.id
}

output "cognito_user_pool_client_id" {
  value = aws_cognito_user_pool_client.ivs_app_client.id
}

# Outputs
output "cognito_identity_pool_id" {
  value = aws_cognito_identity_pool.example_pool.id
}