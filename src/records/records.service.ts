import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './interfaces/record.interface';
import { RecordsRepository } from './records.repository';
import { DailyRecord } from './dto/daily-record.dto';

@Injectable()
export class RecordsService {
  constructor(private readonly recordsRepository: RecordsRepository) {}

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

  async findDailyRecordByDate(date: string): Promise<DailyRecord | null> {
    return this.recordsRepository.findOne(date);
  }

  async insertOne(label: string): Promise<DailyRecord> {
    return this.recordsRepository.insertOne('2023-07-07', {
      label,
      startedAt: '12:00:00',
    });
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {}

  async remove(id: string) {}
}
