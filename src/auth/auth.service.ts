import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './dto/login-request.dto';
import * as secureSession from '@fastify/secure-session';

@Injectable()
export class AuthService {
  login(createAuthDto: LoginRequest, session: secureSession.Session) {
    let res = createAuthDto.password === 'password';
    if (!res) throw new UnauthorizedException();

    // Todo: まともなトークンを発行する
    session.set('visits', 'sample');
  }

  validateSession(session: secureSession.Session) {
    // Todo: セッションをredisに問い合わせる
    if (session.get('visits') !== 'sample') throw new UnauthorizedException();
  }
}
