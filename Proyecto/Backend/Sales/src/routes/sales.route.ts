import { Router } from 'express'
import { healthy , getSupplierSales, postSale, getTotal,purchasesHistory } from '../controllers/sales.controller';

const router = Router();

router.get('/ping', healthy);

/**
 * host + /sales/getSales/idUser
*/
router.get('/getSales/:idUser', getSupplierSales);
/**
 * host + /sales/getTotal/idUser
*/
router.get('/getTotal/:idUser', getTotal);

/**
 * host + /sales/postSale
*/
router.post('/postSale', postSale);


router.get('/purchasesHistory/:idUser',purchasesHistory)

export default router;
