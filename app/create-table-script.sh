
echo Create table

# aws dynamodb create-table --table-name <table_name> --attribute-definitions  <attribute_definitions> \
# --key-schema <key_schema> --billing-mode <billing_mode>  --endpoint-url http://dynamodb:8000 --region <region>

aws dynamodb create-table \
    --table-name MusicCollection \
    --attribute-definitions AttributeName=id,AttributeType=S AttributeName=email,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH AttributeName=email,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --tags Key=Owner,Value=blueTeam


# aws dynamodb list-tables --endpoint-url http://localhost:8000