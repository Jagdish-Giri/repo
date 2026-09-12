import { sendSuccess } from '../utils/apiResponse.js';
import { enforceIdempotency } from '../utils/idempotency.js';
import * as orderService from '../services/orderService.js';

export const reserve = async (req, res) => {
  await orderService.reserveStock(req.user.id, req.validated.body.items);
  return sendSuccess(res, null, 'reserved');
};

export const checkout = async (req, res) => {
  const existing = await enforceIdempotency(req, 'checkout');
  if (existing && !existing.pending) return sendSuccess(res, existing, 'idempotent_replay');
  const order = await orderService.checkout(req, req.validated.body);
  return sendSuccess(res, order, 'order_created');
};

export const webhook = async (req, res) => sendSuccess(res, await orderService.reconcilePayment(req.validated.body), 'payment_reconciled');
export const listOrders = async (req, res) => sendSuccess(res, await orderService.listOrders(req.user, req.query));
