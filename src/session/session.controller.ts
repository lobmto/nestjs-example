import { Controller, Get, Session } from '@nestjs/common';
import * as secureSession from '@fastify/secure-session';

@Controller('session')
export class SessionController {
  @Get()
  findAll(@Session() session: secureSession.Session) {
    const visits = session.get('visits');
    session.set('visits', visits ? visits + 1 : 1);
    return 'session';
  }
}
