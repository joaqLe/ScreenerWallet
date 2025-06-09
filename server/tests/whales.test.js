const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

describe('/api/whales', () => {
  it('returns predefined transactions', async () => {
    const res = await request(app).get('/api/whales');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('transactions');
    expect(Array.isArray(res.body.transactions)).toBe(true);
    expect(res.body.transactions.length).toBeGreaterThan(0);
  });

  it('tracks addresses and alerts', async () => {
    const trackRes = await request(app)
      .post('/api/whales/tracked')
      .send({ address: 'WhaleX' });
    expect(trackRes.statusCode).toBe(200);
    expect(trackRes.body.tracked).toContain('WhaleX');

    const alertRes = await request(app)
      .post('/api/whales/alerts')
      .send({ address: 'WhaleX', token: 'SOL', amount: 1000 });
    expect(alertRes.statusCode).toBe(200);
    expect(alertRes.body.alerts).toEqual([
      { address: 'WhaleX', token: 'SOL', amount: 1000 },
    ]);
  });

  it('retrieves tracked addresses and alerts', async () => {
    await request(app)
      .post('/api/whales/tracked')
      .send({ address: 'WhaleY' });

    const trackedRes = await request(app).get('/api/whales/tracked');
    expect(trackedRes.statusCode).toBe(200);
    expect(trackedRes.body.tracked).toContain('WhaleY');

    await request(app)
      .post('/api/whales/alerts')
      .send({ address: 'WhaleY', token: 'SOL', amount: 2000 });

    const alertsRes = await request(app).get('/api/whales/alerts');
    expect(alertsRes.statusCode).toBe(200);
    expect(alertsRes.body.alerts).toEqual([
      { address: 'WhaleY', token: 'SOL', amount: 2000 },
    ]);
  });
});
