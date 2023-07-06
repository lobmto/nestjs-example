import { Module } from '@nestjs/common';
import { RecordsApi } from './generated';

@Module({
  providers: [RecordsApi],
  exports: [RecordsApi],
})
export class ApiClientModule {}
