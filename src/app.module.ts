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
import { validate } from './env';
import { ApiClientModule } from './api-client/api-client.module';

@Module({
  imports: [
    RecordsModule,
    ConfigModule.forRoot({
      cache: true,
      validate,
      isGlobal: true,
    }),
    CookiesModule,
    SessionModule,
    AuthModule,
    DynamoModule,
    ApiClientModule,
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
