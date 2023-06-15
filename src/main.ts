import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: 'my-secret',
  });
  await app.register(fastifySession, {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // 今回はデプロイしないので保留
    },
  });
  await app.listen(8000);
}
bootstrap();
