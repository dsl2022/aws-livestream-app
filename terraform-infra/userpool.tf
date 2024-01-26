
# Cognito User Pool
resource "aws_cognito_user_pool" "ivs_app_user_pool" {
  name = "ivs_app_user_pool"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  auto_verified_attributes = ["email"]
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "ivs_app_client" {
  name         = "ivs_app_client"
  user_pool_id = aws_cognito_user_pool.ivs_app_user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]

  generate_secret = false
}



