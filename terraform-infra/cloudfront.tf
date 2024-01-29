

resource "aws_cloudfront_distribution" "web_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2"
    

  origin {
    domain_name = "${aws_s3_bucket.ivs_app.bucket}.s3.us-east-1.amazonaws.com"
    origin_id   = aws_s3_bucket.ivs_app.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    target_origin_id = aws_s3_bucket.ivs_app.id
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    ssl_support_method  = "sni-only"
  }
}


resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for accessing S3 bucket"
}

# Example CORS policy for the S3 bucket
resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = aws_s3_bucket.ivs_app.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# CORS configuration for CloudFront will be in the CloudFront distribution settings
