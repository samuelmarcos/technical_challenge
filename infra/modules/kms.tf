resource "aws_kms_key" "main" {
  description             = "technical_challenge key 1"
  deletion_window_in_days = 10
  arn                     = var.kms_key_arn
}