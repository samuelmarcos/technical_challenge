resource "aws_iam_role" "example" {
  name = "example-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}
 
resource "aws_iam_policy" "example" {
  name        = "example-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      Resource = [var.dynamo_arn]
    }]
  })
}
 
resource "aws_iam_role_policy_attachment" "example" {
  policy_arn = aws_iam_policy.example.arn
  role = aws_iam_role.example.name
}


resource "aws_lambda_function" "main" {

    function_name = var.function_name
    filename = var.file_name
    source_code_hash = filebase64sha256(var.file_name)
    handler          = var.handler
    role             = aws_iam_role.example.arn
    runtime          = "nodejs14.x" 

    environment {
      variables = var.environment_variables
    }

     vpc_config {
    subnet_ids         = [var.subnet_ids]
    security_group_ids = [var.security_group_ids]
  }      
}