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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecordResponse> {
    const res = await this.recordsService.findOne(id);
    return { id: res?.id };
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
