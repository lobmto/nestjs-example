import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class RecordsRepository {
  constructor(
    private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
  ) {}
  async findOne(id: string): Promise<Record<string, any> | null> {
    return (
      (
        await this.dynamoDBDocumentClient.send(
          new GetCommand({
            TableName: 'test',
            Key: { id },
          }),
        )
      ).Item ?? null
    );
  }
}
