variable "function_name" {
  description = "Nome da dunction"
  type = string
}

variable "file_name" {
  description = "Nome do arquivo de deploy"
  type = string
}

variable "subnet_ids" {
  description = "Array de subnets"
  type = list(string)
}

variable "security_group_ids" {
  description = "Array de security groups"
  type = list(string)
}

variable "dynamo_arn" {
  description = "Arn do resource dynamodb"
  type = string
}

variable "vpc_id" {
  description = "Id da vpc"
  type = string
}

variable "vpc_cidrs" {
    description = "Array de cidrs da vpc"
    type = list(string)
}

variable "cw_metric_filter" {
  type = any 
}

variable "environment_variables" {
  description = "Variáveis de ambiente"
}