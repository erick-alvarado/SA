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
exports.purchasesHistory = exports.postSale = exports.getTotal = exports.getSupplierSales = exports.healthy = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const cart_models_1 = __importDefault(require("../models/cart.models"));
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
const getSupplierSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser } = req.params;
    //- obtengo el id del proveedor
    try {
        const supplier = yield supplier_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        if (supplier == undefined) {
            return res.status(500).json({
                status: false,
                msg: "Error no existe el proveedor",
            });
        }
        // obtengo el  id de las ventas de ese proveedor
        const prod = yield product_models_1.default.findAll({
            where: {
                id_supplier: supplier === null || supplier === void 0 ? void 0 : supplier.id_supplier,
            }
        });
        if (prod == undefined) {
            return res.status(500).json({
                status: false,
                msg: "Error el proveedor no tiene productos subidos al stock",
            });
        }
        let hystory = [];
        let totalSum = 0;
        let quantitySum = 0;
        let idp = 0;
        // recorro la tabla venta
        for (let data of prod) {
            let detail = yield sales_detail_models_1.default.findOne({
                where: { id_product: data.id_product },
                raw: true,
            });
            if ((detail === null || detail === void 0 ? void 0 : detail.quantity) !== undefined) {
                let venta = yield sales_models_1.default.findOne({
                    where: { id_sale: detail.id_sale },
                    raw: true,
                });
                let quantity = detail === null || detail === void 0 ? void 0 : detail.quantity;
                let total = quantity * data.price;
                let idprov = data.id_supplier;
                hystory.push({
                    'id_supplier': data.id_supplier,
                    'id_sale': detail.id_detail,
                    'date': venta === null || venta === void 0 ? void 0 : venta.date,
                    'quantity': detail === null || detail === void 0 ? void 0 : detail.quantity,
                    'product': data.name,
                    'total': (detail === null || detail === void 0 ? void 0 : detail.quantity) * data.price
                });
                totalSum += total;
                quantitySum += quantity;
                idp = idprov;
            }
        }
        let Total = {
            totalSum: totalSum,
            quantitySum: quantitySum,
            id_supplier: idp
        };
        return res.status(201).json({ hystory });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.getSupplierSales = getSupplierSales;
const getTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser } = req.params;
    //- obtengo el id del proveedor
    try {
        const supplier = yield supplier_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        if (supplier == undefined) {
            return res.status(500).json({
                status: false,
                msg: "Error no existe el proveedor",
            });
        }
        // obtengo el  id de las ventas de ese proveedor
        const prod = yield product_models_1.default.findAll({
            where: {
                id_supplier: supplier === null || supplier === void 0 ? void 0 : supplier.id_supplier,
            }
        });
        if (prod == undefined) {
            return res.status(500).json({
                status: false,
                msg: "Error el proveedor no tiene productos subidos al stock",
            });
        }
        let detalle = [];
        let totalSum = 0;
        let quantitySum = 0;
        let idp = 0;
        // recorro la tabla venta
        for (let data of prod) {
            let detail = yield sales_detail_models_1.default.findOne({
                where: { id_product: data.id_product },
                raw: true,
            });
            if ((detail === null || detail === void 0 ? void 0 : detail.quantity) !== undefined) {
                let quantity = detail === null || detail === void 0 ? void 0 : detail.quantity;
                let total = quantity * data.price;
                let idprov = data.id_supplier;
                detalle.push({
                    'id_supplier': data.id_supplier,
                    'quantity': detail === null || detail === void 0 ? void 0 : detail.quantity,
                    'product': data.name,
                    'total': (detail === null || detail === void 0 ? void 0 : detail.quantity) * data.price
                });
                totalSum += total;
                quantitySum += quantity;
                idp = idprov;
            }
        }
        let Total = {
            totalSum: totalSum,
            quantitySum: quantitySum,
            id_supplier: idp
        };
        return res.status(201).json({ Total });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.getTotal = getTotal;
const postSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    let total = 0;
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
    //Getting customer by user id
    const customer = yield customer_models_1.default.findOne({
        where: {
            id_user: idUser,
        }
    });
    const shoppingCart = yield cart_models_1.default.findAll({
        where: {
            id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
        }
    });
    //Checking inventory stock
    for (let detail of shoppingCart) {
        const product = yield product_models_1.default.findOne({
            where: { id_product: detail.id_product },
            raw: true,
        });
        if (detail.quantity > (product === null || product === void 0 ? void 0 : product.stock)) {
            return res.status(400).json({
                status: true,
                msg: "No hay stock suficiente del producto: " + (product === null || product === void 0 ? void 0 : product.name)
            });
        }
        //Adding total of each product 
        total = total + detail.quantity * ((product === null || product === void 0 ? void 0 : product.price) * 1.1);
    }
    //Creating new Sale
    let new_Date = new Date();
    let result = new_Date.toLocaleString();
    const sale = yield sales_models_1.default.create({
        date: result,
        total: total,
        id_customer: customer === null || customer === void 0 ? void 0 : customer.id_customer,
    });
    const productos = [];
    //Decreasing product stock
    for (let detail of shoppingCart) {
        const productBefore = yield product_models_1.default.findOne({
            where: { id_product: detail.id_product },
            raw: true,
        });
        const prod = yield product_models_1.default.update({ stock: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.stock) - detail.quantity }, { where: {
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
        if ((productBefore === null || productBefore === void 0 ? void 0 : productBefore.stock) - detail.quantity == 0) {
            let supplierMail = yield transporter.sendMail({
                from: 'justasimpleman1212@gmail.com',
                to: userSupplier === null || userSupplier === void 0 ? void 0 : userSupplier.email,
                subject: 'AVISO FALTA DE STOCK PARA PROVEEDOR',
                html: `<h1>El stock del producto ${productBefore === null || productBefore === void 0 ? void 0 : productBefore.name} ha llegado a 0</h1>`
            });
        }
        //Adding sale_detail
        const saleDetail = yield sales_detail_models_1.default.create({
            quantity: detail.quantity,
            id_sale: sale.id_sale,
            id_product: productBefore === null || productBefore === void 0 ? void 0 : productBefore.id_product,
        });
        //Deleting from shoping cart
        const deteledCart = yield cart_models_1.default.destroy({
            where: {
                id: detail.id,
            }
        });
        //Insert in product list
        productos.push({
            nombre: productBefore === null || productBefore === void 0 ? void 0 : productBefore.name,
            cantidad: detail.quantity,
            precio: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.price) * 1.1,
            total: (productBefore === null || productBefore === void 0 ? void 0 : productBefore.price) * 1.1 * detail.quantity
        });
    }
    const user = yield user_models_1.default.findOne({
        where: {
            id_user: idUser,
        }
    });
    const newBill = yield bill_models_1.default.create({
        id_sale: sale.id_sale,
        nit: "FLDSMDFR",
        address: "url"
    });
    const factura = {
        numeroFactura: newBill.id_bill,
        fecha: result,
        nombre: (customer === null || customer === void 0 ? void 0 : customer.first_name) + " " + (customer === null || customer === void 0 ? void 0 : customer.last_name),
        productos: productos,
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
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: 'FACTURA ELECTRONICA',
        html: fileURL
    });
    return res.status(200).json({
        status: true,
        msg: 'Compra realizada con exito, total: ' + total
    });
});
exports.postSale = postSale;
function generarFacturaHtml(datosFactura) {
    const template = fs.readFileSync('./bill.html', 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(datosFactura);
    return html;
}
const purchasesHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser } = req.params;
    try {
        const Cliente = yield customer_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        const venta = yield sales_models_1.default.findAll({
            where: {
                id_customer: Cliente === null || Cliente === void 0 ? void 0 : Cliente.id_customer,
            }
        });
        let purchases = [];
        for (let data of venta) {
            let detail = yield sales_detail_models_1.default.findAll({
                where: { id_sale: data.id_sale },
                raw: true,
            });
            for (let data2 of detail) {
                let prod = yield product_models_1.default.findOne({
                    where: { id_product: data2 === null || data2 === void 0 ? void 0 : data2.id_product },
                    raw: true,
                });
                const bill = yield bill_models_1.default.findOne({
                    where: {
                        id_sale: data.id_sale,
                    }
                });
                purchases.push({
                    'id_sale': data2 === null || data2 === void 0 ? void 0 : data2.id_detail,
                    'date': data.date,
                    'total': data.total,
                    'quantity': data2 === null || data2 === void 0 ? void 0 : data2.quantity,
                    'link': bill === null || bill === void 0 ? void 0 : bill.address,
                    'product': prod === null || prod === void 0 ? void 0 : prod.name
                });
            }
        }
        return res.status(201).json({ purchases });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.purchasesHistory = purchasesHistory;
