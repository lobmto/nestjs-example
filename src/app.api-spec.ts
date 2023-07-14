import request from 'supertest';

describe('AppController (API)', () => {
  let agent;
  beforeEach(async () => {
    agent = request.agent('http://localhost:3000/dev');
  });

  it('/ (GET)', () => {
    return agent.get('/').expect(200).expect('Hello World!');
  });
});
