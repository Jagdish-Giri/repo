import mongoose from 'mongoose';

const webhookSchema = new mongoose.Schema({
  url: { type: String, required: true },
  events: [{ type: String }],
  active: { type: Boolean, default: true },
  retryCount: { type: Number, default: 0 },
  lastError: String,
}, { timestamps: true });

export const Webhook = mongoose.model('Webhook', webhookSchema);
