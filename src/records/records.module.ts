import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { DynamoModule } from 'src/dynamo/dynamo.module';
import { RecordsRepository } from './records.repository';
import { EnvironmentVariables } from 'src/env';
import { ConfigService } from '@nestjs/config';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const recordsRepositoryProvider = {
  provide: RecordsRepository,
  useFactory: (
    configService: ConfigService<EnvironmentVariables, true>,
    dynamoDBDocumentClient: DynamoDBDocumentClient,
  ) => {
    return new RecordsRepository(
      dynamoDBDocumentClient,
      configService.get('DAILY_RECORD_TABLE'),
    );
  },
  inject: [ConfigService<EnvironmentVariables, true>, DynamoDBDocumentClient],
};

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, recordsRepositoryProvider],
  imports: [DynamoModule],
})
export class RecordsModule {}
