import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  jti: { type: String, required: true },
  tokenHash: { type: String, required: true },
  revokedAt: Date,
}, { _id: false });

const resetSchema = new mongoose.Schema({
  tokenHash: String,
  expiresAt: Date,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'customer'], default: 'customer' },
  refreshTokens: [refreshTokenSchema],
  passwordReset: resetSchema,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
