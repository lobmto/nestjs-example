import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './dto/login-request.dto';
import { Session } from 'fastify';

@Injectable()
export class AuthService {
  login(createAuthDto: LoginRequest, session: Session) {
    let res = createAuthDto.password === 'password';
    if (!res) throw new UnauthorizedException();
    session.set('visits', 'sample');
  }
  validateSession(session: Session) {
    // Todo: セッションをredisに問い合わせる
    if (session.get('visits') !== 'sample') throw new UnauthorizedException();
  }
}
