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
exports.getProductList = exports.InsertProduct = exports.healthy = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const list_models_1 = __importDefault(require("../models/list.models"));
const nodemailer = require("nodemailer");
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const InsertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_product, id_user } = req.body;
    try {
        const cliente = yield customer_models_1.default.findOne({
            where: {
                id_user: id_user,
            }
        });
        const newProduct = yield list_models_1.default.create({
            id_product: id_product,
            id_customer: cliente === null || cliente === void 0 ? void 0 : cliente.id_customer
        });
        return res.status(201).json({
            status: true,
            id: newProduct.id_list,
            idProduct: newProduct.id_product,
            id_customer: newProduct.id_customer,
            msj: 'Producto insertado con exito'
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
exports.InsertProduct = InsertProduct;
const getProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_user } = req.params;
    console.log(id_user);
    try {
        let cliente = yield customer_models_1.default.findOne({
            where: {
                id_user: id_user
            }
        });
        console.log(cliente === null || cliente === void 0 ? void 0 : cliente.id_customer);
        let list = yield list_models_1.default.findAll({
            where: {
                id_customer: cliente === null || cliente === void 0 ? void 0 : cliente.id_customer
            }
        });
        let lista = [];
        for (let data of list) {
            let prod = yield product_models_1.default.findOne({
                where: { id_product: data.id_product },
                raw: true,
            });
            lista.push({
                'id_product': data.id_product,
                'name': prod === null || prod === void 0 ? void 0 : prod.name,
                'price': (prod === null || prod === void 0 ? void 0 : prod.price) + ((prod === null || prod === void 0 ? void 0 : prod.price) * 0.1),
                'stock': prod === null || prod === void 0 ? void 0 : prod.stock,
                'img': prod === null || prod === void 0 ? void 0 : prod.img,
                'description': prod === null || prod === void 0 ? void 0 : prod.description
            });
        }
        return res.status(201).json({ lista });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.getProductList = getProductList;
