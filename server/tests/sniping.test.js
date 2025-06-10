const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

describe('/api/sniping', () => {
  it('handles rules and snipes', async () => {
    const ruleRes = await request(app)
      .post('/api/sniping/rules')
      .send({ token: 'SOL', amount: 1 });
    expect(ruleRes.statusCode).toBe(200);
    expect(ruleRes.body).toMatchObject({ token: 'SOL', amount: 1 });

    const rules = await request(app).get('/api/sniping/rules');
    expect(rules.body).toHaveLength(1);

    const delRes = await request(app).delete(
      `/api/sniping/rules/${ruleRes.body.id}`,
    );
    expect(delRes.statusCode).toBe(200);

    const empty = await request(app).get('/api/sniping/rules');
    expect(empty.body).toHaveLength(0);

    const snipeRes = await request(app)
      .post('/api/sniping/snipes')
      .send({ token: 'SOL', price: 10 });
    expect(snipeRes.statusCode).toBe(200);
    expect(snipeRes.body).toMatchObject({ token: 'SOL', price: 10 });

    const snipes = await request(app).get('/api/sniping/snipes');
    expect(snipes.body).toHaveLength(1);
  });
});
