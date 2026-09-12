import crypto from 'crypto';
import { User } from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';
import { ApiError } from '../utils/apiError.js';

const sha = (v) => crypto.createHash('sha256').update(v).digest('hex');

const issueTokens = async (user) => {
  const payload = { id: user._id.toString(), role: user.role, email: user.email };
  const accessToken = signAccessToken(payload);
  const refresh = signRefreshToken(payload);
  user.refreshTokens.push({ jti: refresh.jti, tokenHash: sha(refresh.token) });
  await user.save();
  return { accessToken, refreshToken: refresh.token };
};

export const register = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(409, 'Email already exists');
  const user = await User.create({ ...data, password: await hashPassword(data.password) });
  return issueTokens(user);
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password))) throw new ApiError(401, 'Invalid credentials');
  return issueTokens(user);
};

export const rotateRefresh = async (token) => {
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, 'Invalid refresh token');
  const tokenHash = sha(token);
  const session = user.refreshTokens.find((t) => t.jti === decoded.jti && !t.revokedAt && t.tokenHash === tokenHash);
  if (!session) throw new ApiError(401, 'Refresh token revoked');
  session.revokedAt = new Date();
  return issueTokens(user);
};

export const logout = async (token) => {
  if (!token) return;
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id);
  if (!user) return;
  const session = user.refreshTokens.find((t) => t.jti === decoded.jti);
  if (session) session.revokedAt = new Date();
  await user.save();
};

export const issuePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const token = crypto.randomBytes(24).toString('hex');
  user.passwordReset = { tokenHash: sha(token), expiresAt: new Date(Date.now() + 15 * 60 * 1000) };
  await user.save();
  return token;
};

export const consumePasswordReset = async ({ token, password }) => {
  const user = await User.findOne({ 'passwordReset.tokenHash': sha(token), 'passwordReset.expiresAt': { $gt: new Date() } });
  if (!user) throw new ApiError(400, 'Invalid or expired reset token');
  user.password = await hashPassword(password);
  user.passwordReset = undefined;
  user.refreshTokens = [];
  await user.save();
};
