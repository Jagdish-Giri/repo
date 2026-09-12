import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import routes from './routes/index.js';
import { logger } from './config/logger.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { requestId } from './middleware/requestId.js';
import { maintenanceGate } from './middleware/maintenance.js';
import { ensureCsrfCookie, verifyCsrf } from './middleware/csrf.js';

export const createApp = () => {
  const app = express();
  app.use(requestId);
  app.use(pinoHttp({ logger, customProps: (req) => ({ requestId: req.id }) }));
  app.use(helmet());
  app.use(cors({ origin: [env.appOrigin], credentials: true }));
  app.use(compression());
  app.use(rateLimit({ windowMs: 60 * 1000, limit: 120 }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(ensureCsrfCookie);
  app.use(verifyCsrf);
  app.use(maintenanceGate);

  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
