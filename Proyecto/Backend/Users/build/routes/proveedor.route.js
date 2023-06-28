"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_controller_1 = require("../controllers/proveedor.controller");
const router = (0, express_1.Router)();
/**
 * host + /user/ping
*/
router.get('/ping', proveedor_controller_1.healthy);
/**
 * host + /Proveedor/Registrar
*/
router.post('/Registrar', proveedor_controller_1.registrarProveedor);
exports.default = router;
