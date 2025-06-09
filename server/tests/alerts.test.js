const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

describe('/api/alerts', () => {
  it('returns empty array initially', async () => {
    const res = await request(app).get('/api/alerts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('creates and updates an alert', async () => {
    const alertData = {
      token: 'SOL',
      type: 'price',
      condition: '>1',
      notify: 'email',
    };

    const createRes = await request(app).post('/api/alerts').send(alertData);
    expect(createRes.statusCode).toBe(200);
    expect(createRes.body).toMatchObject(alertData);
    expect(createRes.body).toHaveProperty('id');

    const id = createRes.body.id;

    const patchRes = await request(app)
      .patch(`/api/alerts/${id}`)
      .send({ active: false });
    expect(patchRes.statusCode).toBe(200);
    expect(patchRes.body.active).toBe(false);
  });
});
