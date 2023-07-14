import { setupAgent } from 'src/common/api-test';

describe('RecordsController (API)', () => {
  let agent;

  beforeEach(async () => {
    agent = setupAgent();
  });

  describe('/records/:date (GET)', () => {
    it('returns daily record', async () => {
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/records/2023-07-07');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        date: '2023-07-07',
        records: [
          {
            label: 'sample',
            startedAt: '12:00:00',
          },
        ],
      });
    });

    it('returns null when record not found', async () => {
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/records/2020-01-01');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(null);
    });

    it('requires login', async () => {
      await agent.get('/records/2023-07-07').expect(401);
    });
  });
});
