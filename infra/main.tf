
module "signup_function" {
    source = "./modules"
    function_name = var.function_name
    file_name  = "signupFunction_playload.zip"
    subnet_ids = var.subnet_ids
    security_group_ids = var.security_group_ids
    dynamo_arn = var.dynamo_arn
    vpc_id = var.vpc_id
    vpc_cidrs = var.vpc_cidrs

    cw_metric_filter = var.cw_metric_filter

    environment_variables = var.environment_variables
    kms_key_arn = var.kms_key_arn
}

module "add_access_count_function" {
    source = "./modules"
    function_name = "add_access_count_function"
    file_name  = "signupFunction_playload.zip"
    subnet_ids = var.subnet_ids
    security_group_ids = var.security_group_ids
    dynamo_arn = var.dynamo_arn
    vpc_id = var.vpc_id
    vpc_cidrs = var.vpc_cidrs

    cw_metric_filter = var.cw_metric_filter

    environment_variables = var.environment_variables
    kms_key_arn = var.kms_key_arn
}

module "user_info_function" {
    source = "./modules"
    function_name = "user_info_function"
    file_name  = "signupFunction_playload.zip"
    subnet_ids = var.subnet_ids
    security_group_ids = var.security_group_ids
    dynamo_arn = var.dynamo_arn
    vpc_id = var.vpc_id
    vpc_cidrs = var.vpc_cidrs

    cw_metric_filter = var.cw_metric_filter

    environment_variables = var.environment_variables
    kms_key_arn = var.kms_key_arn
}

module "increase_access_count_function" {
    source = "./modules"
    function_name = "increase_access_count_function"
    file_name  = "signupFunction_playload.zip"
    subnet_ids = var.subnet_ids
    security_group_ids = var.security_group_ids
    dynamo_arn = var.dynamo_arn
    vpc_id = var.vpc_id
    vpc_cidrs = var.vpc_cidrs

    cw_metric_filter = var.cw_metric_filter

    environment_variables = var.environment_variables
    kms_key_arn = var.kms_key_arn
}