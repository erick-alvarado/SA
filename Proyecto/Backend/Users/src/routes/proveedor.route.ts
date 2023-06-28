import { Router } from 'express';
import { healthy, registrarProveedor } from '../controllers/proveedor.controller'

const router = Router();

/**
 * host + /user/ping
*/
router.get('/ping', healthy);

/**
 * host + /Proveedor/Registrar
*/
router.post('/Registrar',registrarProveedor);

export default router;

