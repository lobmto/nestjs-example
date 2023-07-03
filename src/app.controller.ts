import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './auth/auth.decorator';
import { EnvironmentVariables } from './env';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    const tableName = this.configService.get('TABLE_NAME', { infer: true });
    console.error(tableName);
    return this.appService.getHello();
  }
}
