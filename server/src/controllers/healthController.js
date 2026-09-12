import mongoose from 'mongoose';
import { sendSuccess } from '../utils/apiResponse.js';

export const live = (_req, res) => sendSuccess(res, { status: 'live' });
export const ready = (_req, res) => sendSuccess(res, { status: mongoose.connection.readyState === 1 ? 'ready' : 'degraded' });
