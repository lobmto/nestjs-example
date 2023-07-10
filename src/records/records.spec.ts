import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';
import fastifySession from '@fastify/session';
import { AppModule } from 'src/app.module';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('RecordsController (e2e)', () => {
  let app: NestFastifyApplication;
  let dbClient: DynamoDBDocumentClient;

  beforeEach(async () => {
    dbClient = new (jest.requireMock(
      '@aws-sdk/lib-dynamodb',
    ).DynamoDBDocumentClient)();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DynamoDBDocumentClient)
      .useValue(dbClient)
      .compile();
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

  describe('/records/:date (GET)', () => {
    it('returns daily record', async () => {
      dbClient.send = jest.fn().mockResolvedValue({
        Item: {
          date: '2023-07-07',
          records: [
            {
              label: 'label',
              startedAt: '12:00:00',
            },
          ],
        },
      });

      const agent = request.agent(app.getHttpServer());
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/records/2023-07-07');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        date: '2023-07-07',
        records: [
          {
            label: 'label',
            startedAt: '12:00:00',
          },
        ],
      });
    });

    it('returns null when record not found', async () => {
      dbClient.send = jest.fn().mockResolvedValue({
        Item: undefined,
      });

      const agent = request.agent(app.getHttpServer());
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/records/2023-07-07');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(null);
    });

    it('requires login', async () => {
      dbClient.send = jest.fn();

      const agent = request.agent(app.getHttpServer());
      await agent.get('/records/2023-07-07').expect(401);
      expect(dbClient.send).toHaveBeenCalledTimes(0);
    });
  });
});
