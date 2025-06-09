const request = require('supertest');

let app;

beforeEach(() => {
  jest.resetModules();
  app = require('../index');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('/api/prices', () => {
  it('returns price data from Dexscreener', async () => {
    const mockData = { price: 1 };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const res = await request(app).get('/api/prices?token=SOL');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.dexscreener.com/latest/dex/tokens/SOL'
    );
  });
});
