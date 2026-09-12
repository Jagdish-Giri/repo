import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/apiError.js';
import { redis } from '../config/redis.js';
import { storeIdempotentResult } from '../utils/idempotency.js';
import { trackEvent } from './analyticsService.js';

const reserveKey = (userId, id) => `reserve:${userId}:${id}`;

export const reserveStock = async (userId, items, ttlSec = 600) => {
  for (const item of items) {
    const key = reserveKey(userId, `${item.productId}:${item.variantId}`);
    await redis.setex(key, ttlSec, String(item.quantity));
  }
};

export const checkout = async (req, payload) => {
  const session = await mongoose.startSession();
  try {
    let created;
    await session.withTransaction(async () => {
      let total = 0;
      for (const item of payload.items) {
        const product = await Product.findOne({ _id: item.productId, 'variants._id': item.variantId }, null, { session });
        if (!product) throw new ApiError(404, 'Product/variant not found');
        const variant = product.variants.id(item.variantId);
        if (!variant || variant.stock < item.quantity) throw new ApiError(409, 'Insufficient stock');
        variant.stock -= item.quantity;
        total += (variant.price || product.basePrice) * item.quantity;
        await product.save({ session });
      }
      created = await Order.create([{ userId: req.user.id, items: payload.items, totalAmount: total, paymentRef: payload.paymentRef, idempotencyKey: req.headers['idempotency-key'] }], { session });
    });
    await trackEvent('checkout_created', { userId: req.user.id, orderId: created[0]._id.toString() });
    const result = created[0];
    await storeIdempotentResult(req, result, 'checkout');
    return result;
  } finally {
    await session.endSession();
  }
};

export const reconcilePayment = async ({ orderId, status, paymentRef }) => {
  const order = await Order.findByIdAndUpdate(orderId, { status, ...(paymentRef && { paymentRef }) }, { new: true });
  if (order) await trackEvent('payment_reconciled', { orderId, status });
  return order;
};

export const listOrders = async (user, query) => {
  const filter = user.role === 'admin' || user.role === 'manager' ? {} : { userId: user.id };
  return Order.find(filter).sort({ createdAt: -1 }).limit(Math.min(Number(query.limit || 50), 100));
};
