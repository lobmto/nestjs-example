import { Controller, Post, Body, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest as LoginRequest } from './dto/login-request.dto';
import { Public } from './auth.decorator';
import { FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginRequest, @Req() request: FastifyRequest) {
    this.authService.login(loginAuthDto, request.session);
    return {
      status: 'ok',
    };
  }
}
