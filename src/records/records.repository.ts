import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class RecordsRepository {
  constructor(
    private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {}
  async findOne(date: string): Promise<Record<string, any> | null> {
    return (
      (
        await this.dynamoDBDocumentClient.send(
          new GetCommand({
            TableName: this.tableName,
            Key: { date },
          }),
        )
      ).Item ?? null
    );
  }
}
