import { Router } from 'express'
import { healthy } from '../controllers/category.controller'


const router = Router();


router.get('/ping', healthy);




export default router;