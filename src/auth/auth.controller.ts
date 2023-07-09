import { Controller, Post, Body, Req, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest as LoginRequest } from './dto/login-request.dto';
import { Public } from './auth.decorator';
import { FastifyRequest } from 'fastify';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  @Public()
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginRequest, @Req() request: FastifyRequest) {
    this.authService.login(loginAuthDto, request.session);
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
