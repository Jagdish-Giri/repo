import { redis } from '../config/redis.js';

export const getCached = async (key) => {
  const raw = await redis.get(key);
  return raw ? JSON.parse(raw) : null;
};

export const setCached = async (key, value, ttl = 60) => redis.setex(key, ttl, JSON.stringify(value));

export const invalidateByPrefix = async (prefix) => {
  const keys = await redis.keys(`${prefix}*`);
  if (keys.length) await redis.del(...keys);
};
