import request from 'supertest';

export const setupAgent = () => {
  const agent = request.agent('http://localhost:3000/dev');
  return agent;
};
