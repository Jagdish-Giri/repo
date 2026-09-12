import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
  name: String,
  keyHash: { type: String, required: true },
  revokedAt: Date,
}, { timestamps: true });

export const ApiKey = mongoose.model('ApiKey', apiKeySchema);
