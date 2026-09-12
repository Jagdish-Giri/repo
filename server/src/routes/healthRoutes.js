import { Router } from 'express';
import { live, ready } from '../controllers/healthController.js';

const r = Router();
r.get('/live', live);
r.get('/ready', ready);
export default r;
