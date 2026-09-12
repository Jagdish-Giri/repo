import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  name: String,
  price: Number,
  stock: { type: Number, default: 0 },
  attributes: { type: Map, of: String },
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: String,
  tags: [{ type: String, index: true }],
  category: String,
  basePrice: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0 },
  variants: [variantSchema],
  active: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const Product = mongoose.model('Product', productSchema);
