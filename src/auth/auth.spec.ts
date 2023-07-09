import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import fastifySession from '@fastify/session';
import { AppModule } from 'src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { EnvironmentVariables } from 'src/env';
import { ConfigService } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
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
    it('returns 200 if login succeeds', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          password: 'password',
        })
        .expect(200);
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

  describe('/me/id (GET)', () => {
    it('returns 200 with id', async () => {
      const agent = request.agent(app.getHttpServer());
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/me/id');
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe('example');
    });

    it('returns 401 if the credentials are invalid', async () => {
      const agent = request.agent(app.getHttpServer());
      await agent.post('/auth').send({
        password: 'wrong password!',
      });
      const res = await agent.get('/me/id');
      expect(res.statusCode).toBe(401);
      expect(res.body.id).toBeUndefined();
    });
  });
});
