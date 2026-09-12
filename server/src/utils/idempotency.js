import { redis } from '../config/redis.js';
import { ApiError } from './apiError.js';

export const enforceIdempotency = async (req, scope = 'checkout') => {
  const key = req.headers['idempotency-key'];
  if (!key) throw new ApiError(400, 'idempotency-key header required');
  const redisKey = `idem:${scope}:${req.user.id}:${key}`;
  const existing = await redis.get(redisKey);
  if (existing) return JSON.parse(existing);
  await redis.setex(redisKey, 3600, JSON.stringify({ pending: true }));
  return null;
};

export const storeIdempotentResult = async (req, payload, scope = 'checkout') => {
  const key = req.headers['idempotency-key'];
  if (!key) return;
  await redis.setex(`idem:${scope}:${req.user.id}:${key}`, 3600, JSON.stringify(payload));
};
