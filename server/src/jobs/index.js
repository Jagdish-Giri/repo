import { logger } from '../config/logger.js';
import { runAbandonedCartJob } from './abandonedCartJob.js';
import { runLowStockJob } from './lowStockJob.js';

export const startJobs = () => {
  const abandoned = setInterval(() => runAbandonedCartJob().catch((err) => logger.error({ err }, 'abandoned job failed')), 5 * 60 * 1000);
  const lowStock = setInterval(() => runLowStockJob().catch((err) => logger.error({ err }, 'low stock job failed')), 10 * 60 * 1000);
  return () => {
    clearInterval(abandoned);
    clearInterval(lowStock);
  };
};
