import { Router } from 'express'
import { healthy, getCards, postCard, deleteCard} from '../controllers/card.controller'

const router = Router();

/**
 * host + /user/ping
*/
router.get('/ping', healthy);

/**
 * host + user/postCard/:idUser
 */
router.post('/postCard', postCard);

/**
 * host + user/getCards/:idUser
 */
router.get('/getCards/:idUser', getCards);

/**
 * host + user/deleteCard/:idCard
 */
router.delete('/deleteCard/:idCard', deleteCard);

export default router;
