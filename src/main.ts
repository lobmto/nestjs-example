import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import awsLambdaFastify, { PromiseHandler } from '@fastify/aws-lambda';
import { Context, Callback, Handler } from 'aws-lambda';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env';

let server: PromiseHandler;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie as any, {
    secret: 'my-secret',
  });
  await app.register(fastifySession as any, {
    secret: app
      .get(ConfigService<EnvironmentVariables, true>)
      .get('SECRET_SESSION_KEY'),
    // store: new (connectRedis(fastifySession as any))({
    //   client: new Redis(),
    // }) as any,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // 今回はデプロイしないので保留
    },
    saveUninitialized: false,
  });
  await app.init();
  // await app.listen(8000);
  return awsLambdaFastify(app.getHttpAdapter().getInstance(), {
    serializeLambdaArguments: true,
  });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return await server(event, context);
};
bootstrap();
