import { Module } from '@nestjs/common';
import { SessionController, SessionService } from './session.controller';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
