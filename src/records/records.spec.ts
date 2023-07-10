import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RecordsModule } from './records.module';
import { RecordsRepository } from './records.repository';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';

describe('RecordsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RecordsModule,
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
        }),
      ],
    })
      .overrideProvider(DynamoDBDocumentClient)
      .useValue(
        new (jest.requireMock(
          '@aws-sdk/lib-dynamodb',
        ).DynamoDBDocumentClient)(),
      )
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/records/:date (GET)', () => {
    const dbClient = app.get(DynamoDBDocumentClient);
    dbClient.send = jest.fn().mockImplementation((command: GetCommand) => {
      return {
        date: '2023-07-07',
        records: [],
      };
    });
    return request(app.getHttpServer()).get('/records/2023-07-07').expect(200);
  });
});
