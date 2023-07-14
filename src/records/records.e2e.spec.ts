import request from 'supertest';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { setupApp } from 'src/common/e2e-test';

describe('RecordsController (e2e)', () => {
  let app: NestFastifyApplication;
  let dynamoDBDocumentClient: DynamoDBDocumentClient;

  beforeEach(async () => {
    ({ app, dynamoDBDocumentClient } = await setupApp());
  });

  describe('/records/:date (GET)', () => {
    it('returns daily record', async () => {
      dynamoDBDocumentClient.send = jest.fn().mockResolvedValue({
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
      dynamoDBDocumentClient.send = jest.fn().mockResolvedValue({
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
      dynamoDBDocumentClient.send = jest.fn();

      const agent = request.agent(app.getHttpServer());
      await agent.get('/records/2023-07-07').expect(401);
      expect(dynamoDBDocumentClient.send).toHaveBeenCalledTimes(0);
    });
  });
});
