import { z } from 'zod';

export const maintenanceSchema = z.object({ body: z.object({ enabled: z.boolean() }) });
export const apiKeySchema = z.object({ body: z.object({ name: z.string().min(2) }) });
export const webhookCrudSchema = z.object({ body: z.object({ url: z.string().url(), events: z.array(z.string()).default([]), active: z.boolean().optional() }) });
