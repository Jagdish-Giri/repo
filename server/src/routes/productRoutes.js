import { Router } from 'express';
import * as c from '../controllers/productController.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createProductSchema, updateStockSchema } from '../validators/productValidators.js';

const r = Router();
r.get('/', c.listProducts);
r.post('/', authenticate, requireRole('admin', 'manager'), validate(createProductSchema), c.createProduct);
r.patch('/:id', authenticate, requireRole('admin', 'manager'), c.updateProduct);
r.patch('/:id/stock', authenticate, requireRole('admin', 'manager'), validate(updateStockSchema), c.updateStock);
export default r;
