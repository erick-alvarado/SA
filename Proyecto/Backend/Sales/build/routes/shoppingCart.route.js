"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingCart_controller_1 = require("../controllers/shoppingCart.controller");
const router = (0, express_1.Router)();
/**
 * host + /sales/ping
*/
router.get('/ping', shoppingCart_controller_1.healthy);
/**
 * host + /sales/postProduct
*/
router.post('/postProduct', shoppingCart_controller_1.postProduct);
/**
 * host + /sales/addProduct
*/
router.put('/addProduct', shoppingCart_controller_1.addProduct);
/**
 * host + /sales/deleteProduct
*/
router.delete('/deleteProduct', shoppingCart_controller_1.deleteProduct);
/**
 * host + /sales/getCart/idUser
*/
router.get('/getCart/:idUser', shoppingCart_controller_1.getCart);
exports.default = router;
