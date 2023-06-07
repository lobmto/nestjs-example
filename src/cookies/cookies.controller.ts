import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('cookies')
export class CookiesController {
  @Get()
  findAll(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const count = +request.cookies['key'] + 1;
    response.setCookie('key', count.toString());
    return `count: ${count}`;
  }
}
