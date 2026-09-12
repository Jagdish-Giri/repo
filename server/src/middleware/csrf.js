import crypto from 'crypto';
import { ApiError } from '../utils/apiError.js';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

export const ensureCsrfCookie = (req, res, next) => {
  const current = req.cookies?.csrfToken;
  if (current) return next();
  const token = crypto.randomBytes(16).toString('hex');
  res.cookie('csrfToken', token, { sameSite: 'lax', path: '/' });
  req.csrfToken = token;
  return next();
};

export const verifyCsrf = (req, _res, next) => {
  if (SAFE.has(req.method)) return next();
  if (req.path.startsWith('/api/orders/webhook/')) return next();
  if (!req.cookies?.refreshToken) return next();
  const csrfCookie = req.cookies?.csrfToken;
  const csrfHeader = req.headers['x-csrf-token'];
  if (csrfCookie && csrfHeader && csrfCookie === csrfHeader) return next();
  return next(new ApiError(403, 'CSRF token mismatch'));
};
