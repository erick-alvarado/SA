import { Router } from 'express';
import { healthy, login} from '../controllers/login.controller'

const router = Router();

/**
 * host + /ping
*/
router.get('/ping', healthy);

/**
 * host + /Login
*/
router.post('/Login',login);


export default router;