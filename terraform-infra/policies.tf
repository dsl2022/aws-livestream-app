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
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.ivs_app.id

  policy = jsonencode({
    Version = "2008-10-17",
    Id      = "PolicyForCloudFrontPrivateContent",
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal",
        Effect    = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = "s3:GetObject",
        Resource = "arn:aws:s3:::${aws_s3_bucket.ivs_app.bucket}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/${aws_cloudfront_distribution.web_distribution.id}"
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_policy" "web_bucket_policy" {
  bucket = aws_s3_bucket.web_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.web_identity.id}"
        }
        Action   = "s3:*"
        Resource = "${aws_s3_bucket.web_bucket.arn}/*"
      }
    ]
  })
}
