function_name = "signupFunction"
file_name  = "signupFunction_playload.zip"
subnet_ids = []
security_group_ids = []
dynamo_arn = ""
vpc_id = ""
vpc_cidrs = ""

cw_metric_filter = {
    default_value = "0"
    metric_name = "signupFunction-lambda-function/errorLog"
    namespace = "nodejs-faas-register-lambda-function/metrics"
    pattern = "{$.logLevel = \"ERROR\"}" 
    value = "1"
    unit = "Count" 
    log_group_name = "/aws/lambda/signupFunction"
}

environment_variables = {
    ENV= "production" 
    REGION= "us-east-1"
    TABLE_NAME= "stone-dynamo-user"
    SECRET= "SECRET"
    DYNAMO_ENDPOINT= "http://localhost:8000"
    COUNT_ACCESS_URL= "https://api.api-ninjas.com/v1/counter?id=stone_ton"
    INCREASE_COUNT_ACCESS_URL="https://api.api-ninjas.com/v1/counter?id=stone_ton&hit=true"
    API_KEY=""
}