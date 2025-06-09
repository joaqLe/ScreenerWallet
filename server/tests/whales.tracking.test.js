const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

describe('whale tracking endpoints', () => {
  it('adds and retrieves tracked addresses', async () => {
    const trackRes = await request(app)
      .post('/api/whales/tracked')
      .send({ address: 'WhaleA' });
    expect(trackRes.statusCode).toBe(200);
    expect(trackRes.body.tracked).toContain('WhaleA');

    const getRes = await request(app).get('/api/whales/tracked');
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.tracked).toContain('WhaleA');
  });

  it('adds and retrieves whale alerts', async () => {
    const alert = { address: 'WhaleB', token: 'SOL', amount: 500 };
    const post = await request(app).post('/api/whales/alerts').send(alert);
    expect(post.statusCode).toBe(200);
    expect(post.body.alerts).toEqual([alert]);

    const get = await request(app).get('/api/whales/alerts');
    expect(get.statusCode).toBe(200);
    expect(get.body.alerts).toEqual([alert]);
  });
});
