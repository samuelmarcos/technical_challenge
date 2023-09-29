module "dynamodb_table" {
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name     = "stone-dynamo-user"
  hash_key = "email"

  attributes = [
    {
      name = "email"
      type = "S"
    }
  ]
  billing_mode = "PAY_PER_REQUEST"
  read_capacity = 5
  write_capacity = 5
  deletion_protection_enabled = false

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }


}