import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { DynamoModule } from 'src/dynamo/dynamo.module';
import { RecordsRepository } from './records.repository';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository],
  imports: [DynamoModule],
})
export class RecordsModule {}
