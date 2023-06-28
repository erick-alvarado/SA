import { Router } from 'express'
import { healthy, getCards, postCard, deleteCard} from '../controllers/tarjeta.controller'

const router = Router();

/**
 * host + /user/ping
*/
router.get('/ping', healthy);

/**
 * host + user/postCard/:idUser
 */
router.post('/Crear', postCard);

/**
 * host + user/getCards/:idUser
 */
router.post('/Listado', getCards);

/**
 * host + user/deleteCard/:idCard
 */
router.delete('/deleteCard/:idCard', deleteCard);

export default router;
