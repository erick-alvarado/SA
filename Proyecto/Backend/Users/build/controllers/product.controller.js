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
exports.deleteProduct = exports.updateProduct = exports.productByCategory = exports.InsertProduct = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const InsertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    let { description } = req.body;
    let { price } = req.body;
    let { stock } = req.body;
    let { img } = req.body;
    let { id_category } = req.body;
    let { id_supplier } = req.body;
    try {
        const newProduct = yield product_models_1.default.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            img: img,
            id_category: id_category,
            id_supplier: id_supplier,
        });
        return res.status(201).json({
            status: true,
            idProduct: newProduct.id_product,
            name: newProduct.name,
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
const productByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_category } = req.params;
    let { id_supplier } = req.params;
    console.log(id_category);
    console.log(id_supplier);
    try {
        /*---------crear arreglo de un producto-----------*/
        let Producto = [];
        let prod = yield product_models_1.default.findAll({
            where: {
                id_category: id_category,
                id_supplier: id_supplier
            },
            raw: true,
        });
        return res.status(201).json({ prod });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
        });
    }
});
exports.productByCategory = productByCategory;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_product } = req.body;
    let { name } = req.body;
    let { description } = req.body;
    let { price } = req.body;
    let { stock } = req.body;
    let { img } = req.body;
    try {
        const Prod = yield product_models_1.default.update({
            name,
            description,
            price,
            stock,
            img,
        }, {
            where: {
                id_product: id_product
            }
        });
        if (Prod[0] === 1) {
            return res.status(201).json({
                msj: 'Producto modificado correctamente'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_product } = req.params;
    try {
        const Prod = yield product_models_1.default.destroy({
            where: {
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
