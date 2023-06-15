import { Controller, Get, Inject, Req } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Public } from 'src/auth/auth.decorator';

export class SessionService {
  constructor(@Inject(REQUEST) public request: FastifyRequest) {}
}

@Controller('session')
export class SessionController {
  constructor(private service: SessionService) {}
  @Get()
  @Public()
  findAll() {
    // 動作テスト用
    const sessionId = this.service.request.session.sessionId;
    const hoge = this.service.request.session.get('hoge') ?? '1';
    this.service.request.session.set('hoge', +hoge + 1);
    return hoge;
  }
}
