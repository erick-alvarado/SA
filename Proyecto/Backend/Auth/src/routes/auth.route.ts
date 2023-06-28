import { Router } from 'express'
import { healthy } from '../controllers/auth.controller'

const router = Router();

router.get('/ping', healthy);

export default router;

