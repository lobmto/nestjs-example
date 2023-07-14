import { setupAgent } from 'src/common/api-test';

describe('AuthController (API)', () => {
  let agent;

  beforeEach(() => {
    agent = setupAgent();
  });

  describe('/auth (POST)', () => {
    it('returns 200 if login succeeds', () => {
      return agent
        .post('/auth')
        .send({
          password: 'password',
        })
        .expect(200);
    });

    it('returns 401 if the credentials are invalid', () => {
      return agent
        .post('/auth')
        .send({
          password: 'wrong password!',
        })
        .expect(401);
    });
  });

  describe('/me/id (GET)', () => {
    it('returns 200 with id', async () => {
      await agent.post('/auth').send({
        password: 'password',
      });
      const res = await agent.get('/me/id');
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe('example');
    });

    it('returns 401 if the credentials are invalid', async () => {
      await agent.post('/auth').send({
        password: 'wrong password!',
      });
      const res = await agent.get('/me/id');
      expect(res.statusCode).toBe(401);
      expect(res.body.id).toBeUndefined();
    });
  });
});
