import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { CookiesModule } from './cookies/cookies.module';

@Module({
  imports: [RecordsModule, CookiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
