import { Router } from 'express';
import { healthy, postUser, getUser } from '../controllers/cliente.controller'

const router = Router();

/**
 * host + /user/ping
*/
router.get('/ping', healthy);

/**
 * host + /user/postUser
*/
router.post('/Registrar',postUser);

/**
 * host + user/getUser/:idUser
 */
router.get('/getUser/:idUser', getUser);

export default router;
