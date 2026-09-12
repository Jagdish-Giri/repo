import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import adminRoutes from './adminRoutes.js';
import healthRoutes from './healthRoutes.js';

const r = Router();
r.use('/health', healthRoutes);
r.use('/auth', authRoutes);
r.use('/products', productRoutes);
r.use('/orders', orderRoutes);
r.use('/admin', adminRoutes);

export default r;
