import { Product } from '../models/Product.js';
import { getCached, invalidateByPrefix, setCached } from '../utils/cache.js';
import { parsePagination } from '../utils/pagination.js';

export const listProducts = async (query) => {
  const pagination = parsePagination(query);
  const cacheKey = `products:${JSON.stringify(query)}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const filter = { active: true };
  if (query.minPrice || query.maxPrice) filter.basePrice = { ...(query.minPrice && { $gte: Number(query.minPrice) }), ...(query.maxPrice && { $lte: Number(query.maxPrice) }) };
  if (query.tags) filter.tags = { $in: query.tags.split(',') };
  if (query.rating) filter.rating = { $gte: Number(query.rating) };
  if (query.q) filter.$text = { $search: query.q };
  if (query.variantSku) filter['variants.sku'] = query.variantSku;

  let docs;
  if (pagination.useCursor) {
    docs = await Product.find({ ...filter, _id: { $gt: pagination.cursor } }).sort({ _id: 1 }).limit(pagination.limit + 1);
  } else {
    docs = await Product.find(filter).sort({ createdAt: -1 }).skip(pagination.offset).limit(pagination.limit + 1);
  }

  const hasNext = docs.length > pagination.limit;
  const items = docs.slice(0, pagination.limit);
  const result = {
    items,
    pageInfo: {
      hasNext,
      nextCursor: hasNext ? items[items.length - 1]._id : null,
      page: pagination.page,
      limit: pagination.limit,
    },
  };
  await setCached(cacheKey, result, 120);
  return result;
};

export const createProduct = async (payload) => {
  const product = await Product.create(payload);
  await invalidateByPrefix('products:');
  return product;
};

export const updateProduct = async (id, payload) => {
  const product = await Product.findByIdAndUpdate(id, payload, { new: true });
  await invalidateByPrefix('products:');
  return product;
};

export const updateVariantStock = async (productId, variantId, stock) => {
  const product = await Product.findOneAndUpdate({ _id: productId, 'variants._id': variantId }, { $set: { 'variants.$.stock': stock } }, { new: true });
  await invalidateByPrefix('products:');
  return product;
};
