import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './dto/login.request';
import { Session } from 'fastify';

@Injectable()
export class AuthService {
  login(createAuthDto: LoginRequest, session: Session) {
    const res = createAuthDto.password === 'password';
    if (!res) throw new UnauthorizedException();
    session.isAuthenticated = true;
  }
  validateSession(session: Session) {
    if (!session.isAuthenticated) throw new UnauthorizedException();
  }
}
