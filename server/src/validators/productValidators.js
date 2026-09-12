import { z } from 'zod';

const variant = z.object({ sku: z.string().min(1), name: z.string().optional(), price: z.number().nonnegative().optional(), stock: z.number().int().nonnegative().default(0), attributes: z.record(z.string()).optional() });

export const createProductSchema = z.object({ body: z.object({ name: z.string().min(2), description: z.string().optional(), tags: z.array(z.string()).default([]), category: z.string().optional(), basePrice: z.number().nonnegative(), rating: z.number().min(0).max(5).optional(), variants: z.array(variant).default([]) }) });
export const updateStockSchema = z.object({ body: z.object({ variantId: z.string(), stock: z.number().int().nonnegative() }) });
