
echo Create table

# aws dynamodb create-table --table-name <table_name> --attribute-definitions  <attribute_definitions> \
# --key-schema <key_schema> --billing-mode <billing_mode>  --endpoint-url http://dynamodb:8000 --region <region>

aws dynamodb create-table \
    --table-name MusicCollection \
    --attribute-definitions AttributeName=Artist,AttributeType=S AttributeName=SongTitle,AttributeType=S \
    --key-schema AttributeName=Artist,KeyType=HASH AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --tags Key=Owner,Value=blueTeam


# aws dynamodb list-tables --endpoint-url http://localhost:8000