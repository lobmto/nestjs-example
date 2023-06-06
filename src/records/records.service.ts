import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './interfaces/record.interface';

@Injectable()
export class RecordsService {
  create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record';
  }

  findAll(): Record[] {
    return [
      {
        id: 'test',
        projectId: 'hoge',
        start: new Date(),
        end: new Date(),
      },
    ];
  }

  findOne(id: string) {
    return {
      id,
      projectId: 'hoge',
      start: new Date(),
      end: new Date(),
    };
  }

  update(id: string, updateRecordDto: UpdateRecordDto) {}

  remove(id: string) {}
}
