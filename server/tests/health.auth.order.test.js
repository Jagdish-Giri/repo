import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('critical endpoints scaffold', () => {
  it('health live works', async () => {
    const res = await request(app).get('/api/health/live');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('auth register validates input', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'bad' });
    expect(res.status).toBe(400);
  });

  it('checkout requires auth', async () => {
    const res = await request(app).post('/api/orders/checkout').set('idempotency-key', 'a1').send({ items: [] });
    expect(res.status).toBe(401);
  });
});
