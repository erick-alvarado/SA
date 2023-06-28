"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compra_controller_1 = require("../controllers/compra.controller");
const router = (0, express_1.Router)();
router.get('/ping', compra_controller_1.healthy);
/**
 * host + /Cliente/Comprar
*/
router.post('/Comprar', compra_controller_1.comprar);
exports.default = router;
