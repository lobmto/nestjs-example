import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';

@Controller('dynamo')
export class DynamoController {
  private client: DynamoDBDocumentClient;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {
    const dbClient = new DynamoDBClient({
      endpoint: this.configService.get('DYNAMO_ENDPOINT'),
    });
    this.client = DynamoDBDocumentClient.from(dbClient);
  }

  @Get()
  @Public()
  async findAll() {
    // 動作テスト用
    const res = await this.client.send(
      new GetCommand({
        TableName: this.configService.get('TABLE_NAME'),
        Key: { id: '1234' },
      }),
    );

    return res.Item;
  }
}
