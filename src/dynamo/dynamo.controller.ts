import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

@Controller('dynamo')
export class DynamoController {
  private client: DynamoDBDocumentClient;

  constructor() {
    const dbClient = new DynamoDBClient({
      endpoint: 'http://localhost:8000',
    });
    this.client = DynamoDBDocumentClient.from(dbClient);
  }

  @Get()
  @Public()
  async findAll() {
    // 動作テスト用
    const res = await this.client.send(
      new GetCommand({
        TableName: 'test',
        Key: { id: '1234' },
      }),
    );

    return res.Item;
  }
}
