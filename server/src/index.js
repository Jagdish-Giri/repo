import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectDb } from './config/db.js';
import { redis } from './config/redis.js';
import { startJobs } from './jobs/index.js';
import { attachMetricsFeed } from './ws/metricsFeed.js';

const app = createApp();
const server = http.createServer(app);
const stopJobs = startJobs();
attachMetricsFeed(server);

if (process.env.NODE_ENV !== 'test') {
  connectDb()
    .then(() => server.listen(env.port, () => logger.info({ port: env.port }, 'server started')))
    .catch((err) => {
      logger.error({ err }, 'startup failed');
      process.exit(1);
    });
}

const shutdown = async (signal) => {
  logger.info({ signal }, 'graceful shutdown start');
  stopJobs();
  server.close(async () => {
    await redis.quit();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default server;
