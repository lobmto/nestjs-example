import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  Get,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';
import { Public } from './auth.decorator';
import { FastifyRequest, Session as FastifySession } from 'fastify';
import { LoginResponse } from './dto/login.response';

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
  getOwnId(@Req() request: FastifyRequest) {
    this.authService.validateSession(request.session);
    return {
      id: 'example',
    };
  }
}
