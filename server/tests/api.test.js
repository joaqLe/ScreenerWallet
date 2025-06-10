const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  it('returns health status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
