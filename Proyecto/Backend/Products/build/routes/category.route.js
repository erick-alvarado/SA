"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const product_controller_1 = require("../controllers/product.controller");
const product_controller_2 = require("../controllers/product.controller");
const product_controller_3 = require("../controllers/product.controller");
const product_controller_4 = require("../controllers/product.controller");
const product_controller_5 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
/**
 * host + /product/getcategory
 * */
router.get('/getCategory', category_controller_1.getCategory);
/**
 * host + /product/insertProduct
 * */
router.post('/CrearProducto', product_controller_1.InsertProduct);
/**
 * host + /product/insertProduct/id_categoria/id_proveedor
 * */
router.get('/getproductbyCategory/:id_user', product_controller_2.productByCategory);
/**
 * host + /product/insertProduct/updateProduct
 * */
router.put('/updateProduct', product_controller_3.updateProduct);
/**
 * host + /product/insertProduct/id_producto
 * */
router.delete('/deleteProduct/:id_product', product_controller_4.deleteProduct);
router.get('/getProduct/:id_product', product_controller_5.getProduct);
exports.default = router;
