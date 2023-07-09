import { Controller, Post, Body, HttpCode, Get, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';
import { Public } from './auth.decorator';
import { Session as FastifySession } from 'fastify';
import { LoginResponse } from './dto/login.response';
import { MyIdResponse } from './dto/my-id.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  @Public()
  @HttpCode(200)
  login(
    @Body() loginRequest: LoginRequest,
    @Session() session: FastifySession,
  ): LoginResponse {
    this.authService.login(loginRequest, session);
    return {
      status: 'ok',
    };
  }

  @Get('me/id')
  getOwnId(@Session() session: FastifySession): MyIdResponse {
    this.authService.validateSession(session);
    return {
      id: 'example',
    };
  }
}
