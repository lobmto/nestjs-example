import { Module } from '@nestjs/common';
import { DynamoController } from './dynamo.controller';

@Module({
  controllers: [DynamoController],
})
export class DynamoModule {}
