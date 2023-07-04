import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';

@Controller('dynamo')
export class DynamoController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly dbClient: DynamoDBDocumentClient,
  ) {}

  @Get()
  @Public()
  async findAll() {
    // 動作テスト用
    const res = await this.dbClient.send(
      new GetCommand({
        TableName: this.configService.get('TABLE_NAME'),
        Key: { id: '1234' },
      }),
    );

    return res.Item;
  }
}
