import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

export const connectDb = async () => {
  if (!env.mongoUri) throw new Error('MONGO_URI is required');
  await mongoose.connect(env.mongoUri, { maxPoolSize: 20, minPoolSize: 5, serverSelectionTimeoutMS: 5000 });
  logger.info('MongoDB connected');
};
