import { Router } from 'express'
import { healthy, postProduct, addProduct, deleteProduct, getCart } from '../controllers/shoppingCart.controller'

const router = Router();

/**
 * host + /sales/ping
*/
router.get('/ping', healthy);

/**
 * host + /sales/postProduct
*/
router.post('/postProduct', postProduct);

/**
 * host + /sales/addProduct
*/
router.put('/addProduct', addProduct);

/**
 * host + /sales/deleteProduct
*/
router.delete('/deleteProduct', deleteProduct);

/**
 * host + /sales/getCart/idUser
*/
router.get('/getCart/:idUser', getCart);




export default router;
