const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

describe('/api/security', () => {
  it('returns mock security data for a token', async () => {
    const res = await request(app).get('/api/security?token=SOL');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token', 'SOL');
    expect(res.body).toHaveProperty('score');
    expect(Array.isArray(res.body.topHolders)).toBe(true);
    expect(res.body).toHaveProperty('properties');
  });
});
