import { Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { DailyRecord } from './dto/daily-record.dto';
import { TimeRecord } from './dto/record.dto';

@Injectable()
export class RecordsRepository {
  constructor(
    private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {}
  async findOne(date: string): Promise<DailyRecord | null> {
    const records = (
      await this.dynamoDBDocumentClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { date },
        }),
      )
    )?.Item;

    if (!records) return null;

    return {
      date: records.date,
      records: records.records.map((record) => ({
        label: record.label,
        startedAt: record.startedAt,
      })),
    };
  }

  async insertOne(date: string, record: TimeRecord): Promise<DailyRecord> {
    const records = (
      await this.dynamoDBDocumentClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { date },
        }),
      )
    )?.Item ?? { date, records: [] };

    const updatedRecords = {
      date,
      records: [...records.records, record],
    };

    await this.dynamoDBDocumentClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: updatedRecords,
      }),
    );

    return updatedRecords;
  }
}
