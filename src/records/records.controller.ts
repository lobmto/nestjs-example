import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordResponse } from './dto/record.response';
import { Public } from 'src/auth/auth.decorator';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  async findAll() {
    return this.recordsService.findAll();
  }

  @Get(':date')
  async findOne(@Param('date') date: string): Promise<RecordResponse | null> {
    const res = await this.recordsService.findDailyRecordByDate(date);
    if (!res) return null;

    return {
      date: res.date,
      records: res.records.map((record) => ({
        label: record.label,
        startedAt: record.startedAt,
      })),
    };
  }

  @Public()
  @Post('/today/:label')
  async insertOne(@Param('label') label: string): Promise<RecordResponse> {
    const res = await this.recordsService.insertOne(label);
    return {
      ...res,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.recordsService.remove(id);
  }
}
