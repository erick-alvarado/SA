"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.comprar = exports.healthy = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
const sales_models_1 = __importDefault(require("../models/sales.models"));
const sales_detail_models_1 = __importDefault(require("../models/sales_detail.models"));
const bill_models_1 = __importDefault(require("../models/bill.models"));
const s3_controller_1 = require("../controllers/s3.controller");
const fs = __importStar(require("fs"));
const handlebars = __importStar(require("handlebars"));
const nodemailer = require("nodemailer");
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const comprar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id, codTarjeta, total, productos } = req.body;
        //Nodemailer config
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'justasimpleman1212@gmail.com',
                pass: 'ntxsbjtfqtpdnhcs'
            },
        });
        //Getting customer 
        const customer = yield customer_models_1.default.findOne({
            where: {
                id_customer: id,
            }
        });
        //Getting customer user
        const userCustomer = yield user_models_1.default.findOne({
            where: {
                id_user: customer === null || customer === void 0 ? void 0 : customer.id_user,
            }
        });
        //Checking inventory stock
        for (let producto of productos) {
            const product = yield product_models_1.default.findOne({
                where: { id_product: producto.idProducto },
                raw: true,
            });
            if (producto.Cantidad > (product === null || product === void 0 ? void 0 : product.stock)) {
                return res.status(400).json({
                    success: false,
                    message: "Error al crear la factura"
                });
            }
        }
        //Creating new Sale
        let new_Date = new Date();
        let result = new_Date.toLocaleString();
        const sale = yield sales_models_1.default.create({
            date: result,
            total: total,
            id_customer: id,
        });
        const productList = [];
        for (let producto of productos) {
            const productBefore = yield product_models_1.default.findOne({
                where: { id_product: producto.idProducto },
                raw: true,
            });
            //Updating product stock
            const prod = yield product_models_1.default.update({ stock: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.stock) - producto.Cantidad }, { where: {
                    id_product: productBefore === null || productBefore === void 0 ? void 0 : productBefore.id_product,
                } });
            //Getting supplier email 
            const supplier = yield supplier_models_1.default.findOne({
                where: {
                    id_supplier: productBefore === null || productBefore === void 0 ? void 0 : productBefore.id_supplier,
                }
            });
            const userSupplier = yield user_models_1.default.findOne({
                where: {
                    id_user: supplier === null || supplier === void 0 ? void 0 : supplier.id_user,
                }
            });
            //Product out of stock advice
            if ((productBefore === null || productBefore === void 0 ? void 0 : productBefore.stock) - producto.Cantidad == 0) {
                let supplierMail = yield transporter.sendMail({
                    from: 'justasimpleman1212@gmail.com',
                    to: userSupplier === null || userSupplier === void 0 ? void 0 : userSupplier.email,
                    subject: 'AVISO FALTA DE STOCK PARA PROVEEDOR',
                    html: `<h1>El stock del producto ${productBefore === null || productBefore === void 0 ? void 0 : productBefore.name} ha llegado a 0</h1>`
                });
            }
            //Adding sale_detail
            const saleDetail = yield sales_detail_models_1.default.create({
                quantity: producto.Cantidad,
                id_sale: sale.id_sale,
                id_product: productBefore === null || productBefore === void 0 ? void 0 : productBefore.id_product,
            });
            //Insert in product list
            productList.push({
                nombre: productBefore === null || productBefore === void 0 ? void 0 : productBefore.name,
                cantidad: producto.Cantidad,
                precio: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.price) * 1.1,
                total: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.price) * 1.1 * producto.Cantidad
            });
        }
        const newBill = yield bill_models_1.default.create({
            id_sale: sale.id_sale,
            nit: "FLDSMDFR",
            address: "url"
        });
        const factura = {
            numeroFactura: newBill.id_bill,
            fecha: result,
            nombre: (customer === null || customer === void 0 ? void 0 : customer.first_name) + " " + (customer === null || customer === void 0 ? void 0 : customer.last_name),
            productos: productList,
            totalGeneral: total,
        };
        const facturaHtml = generarFacturaHtml(factura);
        const htmlSinEscape = facturaHtml.replace(/\r?\n|\r/g, '');
        (0, s3_controller_1.uploadHTML)(`factura-${newBill.id_bill}.html`, htmlSinEscape);
        let fileURL = yield (0, s3_controller_1.getFileURL)(`factura-${newBill.id_bill}.html`);
        const updatedBill = yield bill_models_1.default.update({ address: fileURL }, { where: {
                id_bill: newBill.id_bill,
            } });
        let customerMail = yield transporter.sendMail({
            from: 'justasimpleman1212@gmail.com',
            to: userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.email,
            subject: 'FACTURA ELECTRONICA',
            html: fileURL
        });
        return res.status(200).json({
            success: true,
            message: "Factura Creada!"
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error al crear factura",
            err: error
        });
    }
});
exports.comprar = comprar;
function generarFacturaHtml(datosFactura) {
    const template = fs.readFileSync('./bill.html', 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(datosFactura);
    return html;
}
