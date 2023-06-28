import { Router } from 'express'
import { healthy } from '../controllers/category.controller'
import { getCategory} from '../controllers/category.controller';
import { InsertProduct } from '../controllers/product.controller';
import { productByCategory } from '../controllers/product.controller';
import { updateProduct } from '../controllers/product.controller';
import { deleteProduct } from '../controllers/product.controller';
import { getProduct } from '../controllers/product.controller';

const router = Router();



/**
 * host + /product/getcategory
 * */

router.get('/getCategory',getCategory)

/**
 * host + /product/insertProduct    
 * */
router.post('/CrearProducto',InsertProduct)

/**
 * host + /product/insertProduct/id_categoria/id_proveedor
 * */
router.get('/getproductbyCategory/:id_user',productByCategory)

/**
 * host + /product/insertProduct/updateProduct
 * */
router.put('/updateProduct',updateProduct)


/**
 * host + /product/insertProduct/id_producto
 * */
router.delete('/deleteProduct/:id_product',deleteProduct)





router.get('/getProduct/:id_product',getProduct)






export default router;
