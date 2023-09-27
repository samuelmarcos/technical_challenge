resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = 30

  tags = local.resource_tags
}


resource "aws_cloudwatch_log_metric_filter" "this" {
  count          = 1
  name           = "${aws_lambda_function.this.function_name}_cw_metric_filter"
  pattern        = var.cw_metric_filter["pattern"]
  log_group_name = aws_cloudwatch_log_group.this.name

  metric_transformation {
    name          = var.cw_metric_filter["metric_name"]
    namespace     = var.cw_metric_filter["namespace"]
    value         = var.cw_metric_filter["value"]
    default_value = try(var.cw_metric_filter["default_value"], null) 
    unit          = try(var.cw_metric_filter["unit"], null)         
  }
}