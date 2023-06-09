import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { CookiesModule } from './cookies/cookies.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [RecordsModule, CookiesModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
