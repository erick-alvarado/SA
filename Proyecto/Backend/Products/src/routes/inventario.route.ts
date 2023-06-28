

import { Router } from 'express'
import { getAllProduct } from '../controllers/product.controller';


const router = Router();

/**
 * afafafaf
 */
router.get('/GetProductos',getAllProduct)


export default router;