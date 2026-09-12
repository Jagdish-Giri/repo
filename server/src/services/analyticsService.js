import { AnalyticsEvent } from '../models/Analytics.js';

export const trackEvent = async (type, payload) => AnalyticsEvent.create({ type, payload });

export const getTrafficPerfSummary = async () => {
  const now = Date.now();
  return {
    reqPerMin: Math.round(Math.random() * 200),
    errorRate: Number((Math.random() * 0.05).toFixed(3)),
    latencyMs: { p50: 40, p95: 120, p99: 250 },
    generatedAt: new Date(now),
  };
};
