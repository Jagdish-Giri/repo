import { Product } from '../models/Product.js';
import { trackEvent } from '../services/analyticsService.js';

export const runLowStockJob = async () => {
  const lowStock = await Product.find({ 'variants.stock': { $lt: 5 } }, { _id: 1, name: 1, variants: 1 }).limit(100);
  if (lowStock.length) await trackEvent('low_stock_alert', { products: lowStock.map((p) => ({ id: p._id, name: p.name })) });
  return lowStock.length;
};
