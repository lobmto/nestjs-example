import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './interfaces/record.interface';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { RecordsRepository } from './records.repository';

@Injectable()
export class RecordsService {
  constructor(private readonly recoredsRepository: RecordsRepository) {}

  async create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record';
  }

  async findAll(): Promise<Record[]> {
    return [
      {
        id: 'test',
        projectId: 'hoge',
        start: new Date(),
        end: new Date(),
      },
    ];
  }

  async findOne(id: string) {
    return this.recoredsRepository.findOne(id);
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {}

  async remove(id: string) {}
}
