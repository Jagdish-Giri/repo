import crypto from 'crypto';
import { ApiKey } from '../models/ApiKey.js';
import { Webhook } from '../models/Webhook.js';
import { AnalyticsEvent } from '../models/Analytics.js';
import { env } from '../config/env.js';

const hash = (v) => crypto.createHash('sha256').update(v).digest('hex');

export const metrics = async () => {
  const [activeSessions, bounce, cartAbandon] = await Promise.all([
    AnalyticsEvent.countDocuments({ type: 'session_active' }),
    AnalyticsEvent.countDocuments({ type: 'bounce' }),
    AnalyticsEvent.countDocuments({ type: 'cart_abandonment' }),
  ]);
  return { activeSessions, bounce, cartAbandonment: cartAbandon, funnel: { visitToCart: 0.42, cartToCheckout: 0.31, checkoutToPaid: 0.74 } };
};

export const setMaintenanceMode = (enabled) => {
  process.env.MAINTENANCE_MODE = String(enabled);
  env.maintenanceMode = enabled;
  return { enabled };
};

export const createApiKey = async (name) => {
  const raw = `sk_${crypto.randomBytes(24).toString('hex')}`;
  const key = await ApiKey.create({ name, keyHash: hash(raw) });
  return { id: key._id, name: key.name, key: raw };
};

export const listApiKeys = async () => ApiKey.find({}, { keyHash: 0 }).sort({ createdAt: -1 });
export const revokeApiKey = async (id) => ApiKey.findByIdAndUpdate(id, { revokedAt: new Date() }, { new: true });
export const rotateApiKey = async (id) => {
  const raw = `sk_${crypto.randomBytes(24).toString('hex')}`;
  const key = await ApiKey.findByIdAndUpdate(id, { keyHash: hash(raw), revokedAt: null }, { new: true });
  return { id: key._id, key: raw };
};

export const createWebhook = async (payload) => Webhook.create(payload);
export const listWebhooks = async () => Webhook.find().sort({ createdAt: -1 });
export const updateWebhook = async (id, payload) => Webhook.findByIdAndUpdate(id, payload, { new: true });
export const deleteWebhook = async (id) => Webhook.findByIdAndDelete(id);

export const enqueueWebhookRetry = async (id) => Webhook.findByIdAndUpdate(id, { $inc: { retryCount: 1 } }, { new: true });
