
# IAM Roles
resource "aws_iam_role" "authenticated_role" {
  name = "Cognito_IvsAppAuthenticatedRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRoleWithWebIdentity",
      Effect = "Allow",
      Principal = {
        Federated = "cognito-identity.amazonaws.com"
      },
      Condition = {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": aws_cognito_identity_pool.ivs_app_identity_pool.id
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }]
  })
}

resource "aws_iam_role" "unauthenticated_role" {
  name = "Cognito_IvsAppUnauthenticatedRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRoleWithWebIdentity",
      Effect = "Allow",
      Principal = {
        Federated = "cognito-identity.amazonaws.com"
      },
      Condition = {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": aws_cognito_identity_pool.ivs_app_identity_pool.id
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated"
        }
      }
    }]
  })
}

# IAM Role Policies
# Attach appropriate policies based on your requirements

# Attaching roles to Cognito Identity Pool
resource "aws_cognito_identity_pool_roles_attachment" "ivs_app_pool_attachment" {
  identity_pool_id = aws_cognito_identity_pool.ivs_app_identity_pool.id

  roles = {
    "authenticated"   = aws_iam_role.authenticated_role.arn
    "unauthenticated" = aws_iam_role.unauthenticated_role.arn
  }
}
