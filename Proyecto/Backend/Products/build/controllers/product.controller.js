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
exports.getProduct = exports.getAllProduct = exports.deleteProduct = exports.updateProduct = exports.productByCategory = exports.InsertProduct = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../config/config");
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = config_1.S3_CONFIG;
const product_models_1 = __importDefault(require("../models/product.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const category_models_1 = __importDefault(require("../models/category.models"));
const client = new client_s3_1.S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});
const InsertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, Nombre_Producto, Precio, Cantidad_Producto, Imagen, IdCategoria } = req.body;
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const unido = hora + ":" + minutos + ":" + segundos;
    const nombrei = unido + ".jpg";
    const cadenaRecortada = Imagen.split(",")[1];
    let buff = Buffer.from(cadenaRecortada, 'base64');
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: nombrei,
        Body: buff,
        ContentType: "image"
    };
    const command = new client_s3_1.PutObjectCommand(uploadParams);
    yield client.send(command);
    console.log(nombrei);
    let url = 'https://sag11.s3.amazonaws.com/' + nombrei;
    try {
        const newProduct = yield product_models_1.default.create({
            name: Nombre_Producto,
            description: "Producto nuevo",
            price: Precio,
            stock: Cantidad_Producto,
            img: url,
            id_category: IdCategoria,
            id_supplier: id,
        });
        return res.status(201).json({
            success: true,
            message: 'Producto registrado Correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            massage: "No se pudo registrar en el inventario",
            error: error
        });
    }
});
exports.InsertProduct = InsertProduct;
const productByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_user } = req.params;
    const supplier = yield supplier_models_1.default.findOne({
        where: {
            id_user: id_user,
        }
    });
    try {
        /*---------crear arreglo de un producto-----------*/
        let prod = yield product_models_1.default.findAll({
            where: {
                id_supplier: supplier === null || supplier === void 0 ? void 0 : supplier.id_supplier
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
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*---------crear arreglo de un producto-----------*/
        let prod = yield product_models_1.default.findAll();
        let message = [];
        for (let data of prod) {
            let categoria = yield category_models_1.default.findOne({
                where: { id: data.id_category }
            });
            message.push({
                IdProducto: data.id_product,
                Nombre_Producto: data.name,
                Precio: data.price,
                Imagen: data.img,
                Nombre_Categoria: categoria === null || categoria === void 0 ? void 0 : categoria.name,
                Cantidad: data.stock,
                IdProveedor: data.id_supplier,
            });
        }
        return res.status(200).json({ succes: true, message });
    }
    catch (error) {
        return res.status(500).json({
            succes: false,
            message: "No se Pudo obtener los Productos",
        });
    }
});
exports.getAllProduct = getAllProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_product } = req.params;
    try {
        /*---------crear arreglo de un producto-----------*/
        let prod = yield product_models_1.default.findOne({
            where: {
                id_product: id_product
            }
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
exports.getProduct = getProduct;
