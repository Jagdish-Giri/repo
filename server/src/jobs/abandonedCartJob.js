import { trackEvent } from '../services/analyticsService.js';

export const runAbandonedCartJob = async () => {
  await trackEvent('cart_abandonment_scan', { scannedAt: new Date().toISOString() });
};
