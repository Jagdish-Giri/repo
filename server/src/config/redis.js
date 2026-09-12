import Redis from 'ioredis';
import { env } from './env.js';
import { logger } from './logger.js';

let memory = new Map();

class MemoryRedis {
  async get(k) { return memory.get(k) || null; }
  async set(k, v) { memory.set(k, v); return 'OK'; }
  async setex(k, ttl, v) { memory.set(k, v); setTimeout(() => memory.delete(k), ttl * 1000); return 'OK'; }
  async del(...keys) { keys.forEach((k) => memory.delete(k)); return 1; }
  async keys(pattern) { const r = new RegExp(`^${pattern.replace('*', '.*')}$`); return [...memory.keys()].filter((k) => r.test(k)); }
  async quit() { memory = new Map(); }
}

let redis;
if (process.env.NODE_ENV === 'test') {
  redis = new MemoryRedis();
} else {
  try {
    redis = new Redis(env.redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    await redis.connect();
    logger.info('Redis connected');
  } catch (err) {
    logger.warn({ err: err.message }, 'Redis unavailable, using in-memory cache');
    redis = new MemoryRedis();
  }
}

export { redis };
