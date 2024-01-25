
resource "aws_ivs_channel" "example" {
  type = "BASIC"
  recording_configuration_arn = aws_ivs_recording_configuration.example.arn
}

resource "aws_s3_bucket" "example" {
  bucket_prefix = "tf-ivs-stream-archive"
  force_destroy = true
}

resource "aws_ivs_recording_configuration" "example" {
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
      bucket_name = aws_s3_bucket.example.id
    }
  }
}

data "aws_ivs_stream_key" "example" {
  channel_arn = aws_ivs_channel.example.arn
}

