import { verifyAccessToken } from '../utils/tokens.js';
import { ApiError } from '../utils/apiError.js';

export const authenticate = (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return next(new ApiError(401, 'Unauthorized'));
  try {
    req.user = verifyAccessToken(auth.split(' ')[1]);
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid token'));
  }
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, 'Forbidden'));
  next();
};
