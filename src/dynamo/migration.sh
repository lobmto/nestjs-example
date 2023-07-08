aws dynamodb delete-table \
    --table-name dev.DailyRecord \
    --no-cli-pager \
    --endpoint http://localhost:8000

aws dynamodb create-table \
    --table-name dev.DailyRecord \
    --attribute-definitions \
        AttributeName=date,AttributeType=S \
    --key-schema AttributeName=date,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-class STANDARD \
    --no-cli-pager \
    --endpoint http://localhost:8000

aws dynamodb put-item \
    --table-name dev.DailyRecord \
    --item \
        '{"date": {"S": "2023-07-07"}, "records": {"L": [{"M": {"label": {"S": "sample"}, "startedAt": {"S": "12:00:00"}}}]}}' \
    --return-consumed-capacity TOTAL \
    --no-cli-pager \
    --endpoint http://localhost:8000
