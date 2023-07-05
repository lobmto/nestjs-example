import { Module } from '@nestjs/common';
import { DynamoController } from './dynamo.controller';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';

const dynamoProvider = {
  provide: DynamoDBDocumentClient,
  useFactory: (configService: ConfigService<EnvironmentVariables, true>) => {
    const dbClient = new DynamoDBClient({
      endpoint: configService.get('DYNAMO_ENDPOINT'),
    });
    return DynamoDBDocumentClient.from(dbClient);
  },
  inject: [ConfigService<EnvironmentVariables, true>],
};

@Module({
  providers: [dynamoProvider],
  controllers: [DynamoController],
  exports: [dynamoProvider],
})
export class DynamoModule {}
