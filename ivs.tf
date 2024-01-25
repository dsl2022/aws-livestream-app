
resource "aws_ivs_channel" "ivs_app" {
  type = "BASIC"
  recording_configuration_arn = aws_ivs_recording_configuration.ivs_app.arn
}

resource "aws_s3_bucket" "ivs_app" {
  bucket_prefix = "ivs-app-ivs-stream-archive"
  force_destroy = true
}

resource "aws_ivs_recording_configuration" "ivs_app" {
  name = "tf-ivs-recording-configuration"
  lifecycle {
    create_before_destroy = true
  }
  thumbnail_configuration {
    recording_mode = "INTERVAL"
    target_interval_seconds = 30
  }
  destination_configuration {
    s3 {
      bucket_name = aws_s3_bucket.ivs_app.id
    }
  }
}

data "aws_ivs_stream_key" "ivs_app" {
  channel_arn = aws_ivs_channel.ivs_app.arn
}

