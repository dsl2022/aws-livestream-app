# Cognito Identity Pool with User Pool as an Authentication Provider
resource "aws_cognito_identity_pool" "ivs_app_identity_pool" {
  identity_pool_name               = "ivs_app_identity_pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.ivs_app_client.id
    provider_name           = aws_cognito_user_pool.ivs_app_user_pool.endpoint
    server_side_token_check = true
  }
}
