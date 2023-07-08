import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { DailyRecord } from './dto/daily-record.dto';

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
}
