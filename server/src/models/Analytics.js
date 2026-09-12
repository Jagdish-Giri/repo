import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: { type: String, index: true },
  payload: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsSchema);
