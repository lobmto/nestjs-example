import { setupAgent } from './common/api-test';

describe('AppController (API)', () => {
  let agent;
  beforeEach(async () => {
    agent = setupAgent();
  });

  it('/ (GET)', () => {
    return agent.get('/').expect(200).expect('Hello World!');
  });
});
