"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.deleteProduct = exports.addProduct = exports.postProduct = exports.healthy = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const cart_models_1 = __importDefault(require("../models/cart.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProduct, idUser } = req.body;
        //Getting customer by user id
        const customer = yield customer_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        //Checking if the product is already in the shopping cart
        const takenProduct = yield cart_models_1.default.findOne({
            where: {
                id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
                id_product: idProduct,
            }
        });
        if (takenProduct !== null) {
            return res.status(400).json({
                status: false,
                msg: "El producto ya ha sido anadido al carrito de compras"
            });
        }
        const product = yield cart_models_1.default.create({
            quantity: 1,
            id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
            id_product: idProduct
        });
        return res.status(200).json({
            status: true,
            msg: "Producto anadido exitosamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.postProduct = postProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProduct, idUser } = req.body;
        //Getting customer by user id
        const customer = yield customer_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        //Checking if the product is in the shopping cart
        const takenProduct = yield cart_models_1.default.findOne({
            where: {
                id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
                id_product: idProduct,
            }
        });
        if (takenProduct === null) {
            return res.status(400).json({
                status: false,
                msg: "El producto no se encuentra en el carrito de compras"
            });
        }
        const product = yield cart_models_1.default.update({ quantity: takenProduct.quantity + 1 }, { where: {
                id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
                id_product: idProduct,
            } });
        return res.status(200).json({
            status: true,
            msg: "Producto incrementado exitosamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_user, id_product } = req.body;
    const customer = yield customer_models_1.default.findOne({
        where: {
            id_user: id_user,
        }
    });
    try {
        const cart = yield cart_models_1.default.destroy({
            where: {
                id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
                id_product: id_product
            }
        });
        return res.status(201).json({
            status: true,
            msj: 'Producto Eliminado con exito'
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.deleteProduct = deleteProduct;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser } = req.params;
    //Getting customer by user id
    try {
        //--- devuelve todos los productos del carrito del cliente 
        const customer = yield customer_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        let cart = yield cart_models_1.default.findAll({
            where: {
                id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer
            }
        });
        let carrito = [];
        let contador = 0;
        for (let data of cart) {
            let prod = yield product_models_1.default.findOne({
                where: { id_product: data.id_product },
                raw: true,
            });
            contador = contador + 1;
            carrito.push({
                'id_product': data.id_product,
                'name': prod === null || prod === void 0 ? void 0 : prod.name,
                'price': (prod === null || prod === void 0 ? void 0 : prod.price) + ((prod === null || prod === void 0 ? void 0 : prod.price) * 0.1),
                'total': (data === null || data === void 0 ? void 0 : data.quantity) * (prod === null || prod === void 0 ? void 0 : prod.price) + ((prod === null || prod === void 0 ? void 0 : prod.price) * 0.1)
            });
        }
        return res.status(201).json({ carrito });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.getCart = getCart;
