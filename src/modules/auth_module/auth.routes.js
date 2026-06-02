import {Router} from 'express';

import {login, register , refreshToken , logout , me} from './auth.controller.js';
import {auth} from './auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/me', auth, me);

export default router;

