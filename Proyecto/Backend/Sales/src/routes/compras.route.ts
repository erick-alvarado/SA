import { Router } from 'express'
import { healthy , comprar} from '../controllers/compra.controller';

const router = Router();

router.get('/ping', healthy);

/**
 * host + /Cliente/Comprar
*/
router.post('/Comprar', comprar);

export default router;