aws dynamodb create-table \
    --table-name test \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-class STANDARD \
    --endpoint http://localhost:8000

aws dynamodb put-item \
    --table-name test \
    --item \
        '{"id": {"S": "1234"}, "message": {"S": "This is test"}}' \
    --return-consumed-capacity TOTAL \
    --endpoint http://localhost:8000
