import { env } from '../config/env.js';

export const maintenanceGate = (req, res, next) => {
  if (!env.maintenanceMode || req.path.startsWith('/api/health')) return next();
  return res.status(503).json({ success: false, message: 'Maintenance mode active' });
};
