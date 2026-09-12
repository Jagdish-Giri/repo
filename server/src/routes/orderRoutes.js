import { Router } from 'express';
import * as c from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutSchema, webhookSchema } from '../validators/orderValidators.js';

const r = Router();
r.post('/reserve', authenticate, validate(checkoutSchema), c.reserve);
r.post('/checkout', authenticate, validate(checkoutSchema), c.checkout);
r.post('/webhook/payment', validate(webhookSchema), c.webhook);
r.get('/', authenticate, c.listOrders);
export default r;
