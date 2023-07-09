import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import fastifySession from '@fastify/session';
import { AppModule } from 'src/app.module';
import { Public } from 'src/auth/auth.decorator';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { EnvironmentVariables } from 'src/env';
import { ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    console.log(Public);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
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
  });

  describe('/auth (POST)', () => {
    it('returns 201 if login succeeds', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          password: 'password',
        })
        .expect(201);
    });

    it('returns 401 if the credentials are invalid', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          password: 'wrong password!',
        })
        .expect(401);
    });
  });
});
