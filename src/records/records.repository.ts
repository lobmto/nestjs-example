import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class RecordsRepository {
  constructor(
    private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
  ) {}
  async findOne(date: string): Promise<Record<string, any> | null> {
    return (
      (
        await this.dynamoDBDocumentClient.send(
          new GetCommand({
            TableName: 'DailyRecord',
            Key: { date },
          }),
        )
      ).Item ?? null
    );
  }
}
