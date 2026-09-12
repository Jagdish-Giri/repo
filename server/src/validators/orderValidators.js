import { z } from 'zod';

export const checkoutSchema = z.object({ body: z.object({ items: z.array(z.object({ productId: z.string(), variantId: z.string(), quantity: z.number().int().positive() })).min(1), paymentRef: z.string().optional() }) });
export const webhookSchema = z.object({ body: z.object({ orderId: z.string(), status: z.enum(['paid', 'failed', 'cancelled']), paymentRef: z.string().optional() }) });
