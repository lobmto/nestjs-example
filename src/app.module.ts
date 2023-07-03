import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { CookiesModule } from './cookies/cookies.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DynamoModule } from './dynamo/dynamo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RecordsModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    CookiesModule,
    SessionModule,
    AuthModule,
    DynamoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
