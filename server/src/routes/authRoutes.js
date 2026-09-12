import { Router } from 'express';
import * as c from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema, resetConsumeSchema, resetRequestSchema } from '../validators/authValidators.js';

const r = Router();
r.post('/register', validate(registerSchema), c.register);
r.post('/login', validate(loginSchema), c.login);
r.post('/refresh', c.refresh);
r.post('/logout', c.logout);
r.post('/password-reset/request', validate(resetRequestSchema), c.requestReset);
r.post('/password-reset/consume', validate(resetConsumeSchema), c.consumeReset);
export default r;
