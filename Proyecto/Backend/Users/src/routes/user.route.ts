import { Router } from 'express';
import { healthy, postUser, getUser } from '../controllers/user.controller'

const router = Router();

/**
 * host + /user/ping
*/
router.get('/ping', healthy);

/**
 * host + /user/postUser
*/
router.post('/postUser',postUser);

/**
 * host + user/getUser/:idUser
 */
router.get('/getUser/:idUser', getUser);

export default router;
