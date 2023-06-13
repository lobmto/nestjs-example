import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest as LoginRequest } from './dto/login-request.dto';
import { Public } from './auth.decorator';
import * as secureSession from '@fastify/secure-session';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  login(
    @Body() loginAuthDto: LoginRequest,
    @Session() session: secureSession.Session,
  ) {
    this.authService.login(loginAuthDto, session);
  }
}
