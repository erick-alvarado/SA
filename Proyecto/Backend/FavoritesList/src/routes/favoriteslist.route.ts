import { Router } from 'express'
import { healthy } from '../controllers/favoritelist.controller';
import { InsertProduct,getProductList } from '../controllers/favoritelist.controller';
const router = Router();

router.get('/ping', healthy);

router.post('/postList', InsertProduct);

router.get('/getList/:id_user', getProductList);





export default router;
