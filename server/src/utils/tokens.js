import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';

export const signAccessToken = (payload) => jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessTtl });
export const signRefreshToken = (payload, jti = uuidv4()) => ({ token: jwt.sign({ ...payload, jti }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshTtl }), jti });
export const verifyAccessToken = (token) => jwt.verify(token, env.jwtAccessSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, env.jwtRefreshSecret);
