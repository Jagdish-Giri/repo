import { WebSocketServer } from 'ws';
import { getTrafficPerfSummary } from '../services/analyticsService.js';

export const attachMetricsFeed = (server) => {
  const wss = new WebSocketServer({ server, path: '/ws/metrics' });
  const timer = setInterval(async () => {
    const payload = JSON.stringify(await getTrafficPerfSummary());
    wss.clients.forEach((c) => c.readyState === 1 && c.send(payload));
  }, 5000);
  wss.on('close', () => clearInterval(timer));
  return wss;
};
