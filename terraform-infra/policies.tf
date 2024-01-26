# ... [Previous Resources: Cognito Identity Pool, IAM Roles] ...

# IAM Policy for IVS Access (Modify as needed)
resource "aws_iam_policy" "ivs_policy" {
  name        = "IVSAccessPolicy"
  description = "Policy for accessing IVS resources"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "ivs:GetChannel",
          "ivs:GetStream",
          "ivs:ListChannels",
          "ivs:ListStreams",
          "ivs:PutMetadata",
          "ivs:StopStream",
          # ... [Other IVS Actions as Required] ...
        ],
        Effect = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Attach IVS Policy to Authenticated Role
resource "aws_iam_role_policy_attachment" "ivs_policy_attachment_auth" {
  role       = aws_iam_role.authenticated_role.name
  policy_arn = aws_iam_policy.ivs_policy.arn
}

# Optional: Attach IVS Policy to Unauthenticated Role if needed
# resource "aws_iam_role_policy_attachment" "ivs_policy_attachment_unauth" {
#   role       = aws_iam_role.unauthenticated_role.name
#   policy_arn = aws_iam_policy.ivs_policy.arn
# }

# ... [Rest of the Previous Resources] ...
