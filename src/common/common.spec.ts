import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import fastifySession from '@fastify/session';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const setupApp = async () => {
  const dynamoDBDocumentClient = new (jest.requireMock(
    '@aws-sdk/lib-dynamodb',
  ).DynamoDBDocumentClient)();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DynamoDBDocumentClient)
    .useValue(dynamoDBDocumentClient)
    .compile();
  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie, {
    secret: 'my-secret',
  });
  await app.register(fastifySession, {
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
  await app.getHttpAdapter().getInstance().ready();

  return {
    app,
    dynamoDBDocumentClient,
  };
};
