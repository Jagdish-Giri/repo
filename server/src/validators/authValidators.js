import { z } from 'zod';

export const registerSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8), role: z.enum(['admin', 'manager', 'customer']).optional() }) });
export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(8) }) });
export const resetRequestSchema = z.object({ body: z.object({ email: z.string().email() }) });
export const resetConsumeSchema = z.object({ body: z.object({ token: z.string().min(10), password: z.string().min(8) }) });
