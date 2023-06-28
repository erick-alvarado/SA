"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = require("../controllers/sales.controller");
const router = (0, express_1.Router)();
router.get('/ping', sales_controller_1.healthy);
/**
 * host + /sales/getSales/idUser
*/
router.get('/getSales/:idUser', sales_controller_1.getSupplierSales);
/**
 * host + /sales/getTotal/idUser
*/
router.get('/getTotal/:idUser', sales_controller_1.getTotal);
/**
 * host + /sales/postSale
*/
router.post('/postSale', sales_controller_1.postSale);
router.get('/purchasesHistory/:idUser', sales_controller_1.purchasesHistory);
exports.default = router;
