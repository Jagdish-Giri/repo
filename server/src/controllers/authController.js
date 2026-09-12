import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

const refreshCookieOpts = { httpOnly: true, sameSite: 'lax', path: '/api/auth/refresh' };

export const register = async (req, res) => {
  const tokens = await authService.register(req.validated.body);
  res.cookie('refreshToken', tokens.refreshToken, refreshCookieOpts);
  return sendSuccess(res, { accessToken: tokens.accessToken }, 'registered');
};

export const login = async (req, res) => {
  const tokens = await authService.login(req.validated.body);
  res.cookie('refreshToken', tokens.refreshToken, refreshCookieOpts);
  return sendSuccess(res, { accessToken: tokens.accessToken }, 'logged_in');
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  const tokens = await authService.rotateRefresh(token);
  res.cookie('refreshToken', tokens.refreshToken, refreshCookieOpts);
  return sendSuccess(res, { accessToken: tokens.accessToken }, 'refreshed');
};

export const logout = async (req, res) => {
  await authService.logout(req.cookies.refreshToken);
  res.clearCookie('refreshToken', refreshCookieOpts);
  return sendSuccess(res, null, 'logged_out');
};

export const requestReset = async (req, res) => {
  const token = await authService.issuePasswordReset(req.validated.body.email);
  return sendSuccess(res, { ...(token && { resetToken: token }) }, 'reset_requested');
};

export const consumeReset = async (req, res) => {
  await authService.consumePasswordReset(req.validated.body);
  return sendSuccess(res, null, 'password_reset');
};
