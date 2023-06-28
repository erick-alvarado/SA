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
exports.auctionsdHistory = exports.endAuction = exports.getBidHistory = exports.getAuctions = exports.bidUp = exports.postAuction = exports.healthy = void 0;
const customer_models_1 = __importDefault(require("../models/customer.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
const auction_models_1 = __importDefault(require("../models/auction.models"));
const auction_history_models_1 = __importDefault(require("../models/auction_history.models"));
const auction_sale_models_1 = __importDefault(require("../models/auction_sale.models"));
const bill_models_1 = __importDefault(require("../models/bill.models"));
const s3_controller_1 = require("../controllers/s3.controller");
const nodemailer = require("nodemailer");
const fs = __importStar(require("fs"));
const handlebars = __importStar(require("handlebars"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const postAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, initialValue, description, productName, deadline } = req.body;
        (0, s3_controller_1.uploadFile)(req.files.file);
        let archivo = req.files.file;
        let fileURL = yield (0, s3_controller_1.getFileURL)(archivo.name);
        const auction = yield auction_models_1.default.create({
            initial_value: initialValue,
            actual_value: initialValue,
            description: description,
            product_name: productName,
            deadline: deadline,
            status: 1,
            image: fileURL,
            id_seller: idUser
        });
        return res.status(200).json({
            status: true,
            msg: "Subasta creada con exito"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.postAuction = postAuction;
const bidUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, idAuction, value } = req.body;
        const auction = yield auction_models_1.default.findOne({
            where: {
                id_auction: idAuction,
            }
        });
        //Check if the bid is bigger than the actual one
        if ((auction === null || auction === void 0 ? void 0 : auction.actual_value) >= value) {
            return res.status(400).json({
                status: false,
                msg: "La puja debe ser mayor a la puja actual"
            });
        }
        //Adding previous bid to auction (bid) history
        if ((auction === null || auction === void 0 ? void 0 : auction.id_bidder) != null) {
            const prevBid = yield auction_history_models_1.default.create({
                id_auction: idAuction,
                value: auction.actual_value,
                id_bidder: auction.id_bidder
            });
        }
        //Updating bid
        const updatedAuction = yield auction_models_1.default.update({
            actual_value: value,
            id_bidder: idUser
        }, {
            where: {
                id_auction: idAuction
            }
        });
        return res.status(200).json({
            status: true,
            msg: "Puja realizada con exito"
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
exports.bidUp = bidUp;
const getAuctions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auctions = yield auction_models_1.default.findAll();
        return res.status(200).json({
            status: true,
            msg: "Subastas obtenidas con exito",
            subastas: auctions
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.getAuctions = getAuctions;
const getBidHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const userAuctions = yield auction_models_1.default.findAll({
            where: {
                id_seller: idUser,
            }
        });
        let auctions = [];
        for (let auction of userAuctions) {
            let history = yield auction_history_models_1.default.findAll({
                where: {
                    id_auction: auction.id_auction,
                }
            });
            let bidHistory = [];
            for (let bid of history) {
                const user = yield user_models_1.default.findOne({
                    where: {
                        id_user: bid.id_bidder,
                    }
                });
                bidHistory.push({
                    email: user === null || user === void 0 ? void 0 : user.email,
                    bid: bid.value
                });
            }
            let auctionDetail = {
                auction: auction,
                history: bidHistory,
            };
            auctions.push(auctionDetail);
        }
        return res.status(200).json({
            status: true,
            msg: "Historial de pujas obtenido con exito",
            detalleSubastas: auctions
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.getBidHistory = getBidHistory;
const endAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idAuction } = req.body;
        const updateAuction = yield auction_models_1.default.update({ status: 2 }, { where: {
                id_auction: idAuction,
            } });
        const updatedAuction = yield auction_models_1.default.findOne({
            where: {
                id_auction: idAuction,
            }
        });
        const newSale = yield auction_sale_models_1.default.create({
            id_auction: idAuction
        });
        const newBill = yield bill_models_1.default.create({
            id_auction_sale: newSale.id_auction_sale,
            nit: "FLDSMDFR",
            address: "url"
        });
        const purchaseUser = yield user_models_1.default.findOne({
            where: {
                id_user: updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.id_bidder,
            }
        });
        let name = "";
        if ((purchaseUser === null || purchaseUser === void 0 ? void 0 : purchaseUser.rol) == 1) {
            //Customer
            const customer = yield customer_models_1.default.findOne({
                where: {
                    id_user: purchaseUser === null || purchaseUser === void 0 ? void 0 : purchaseUser.id_user,
                }
            });
            name = (customer === null || customer === void 0 ? void 0 : customer.first_name) + " " + (customer === null || customer === void 0 ? void 0 : customer.last_name);
        }
        else {
            //Supplier
            const supplier = yield supplier_models_1.default.findOne({
                where: {
                    id_user: purchaseUser === null || purchaseUser === void 0 ? void 0 : purchaseUser.id_user,
                }
            });
            name = supplier === null || supplier === void 0 ? void 0 : supplier.brand;
        }
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const factura = {
            numeroFactura: newBill.id_bill,
            fecha: formattedDate,
            nombre: name,
            productos: [
                { nombre: updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.product_name, cantidad: 1, precio: updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.actual_value, total: updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.actual_value },
            ],
            totalGeneral: updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.actual_value,
        };
        const facturaHtml = generarFacturaHtml(factura);
        const htmlSinEscape = facturaHtml.replace(/\r?\n|\r/g, '');
        (0, s3_controller_1.uploadHTML)(`factura-${newBill.id_bill}.html`, htmlSinEscape);
        let fileURL = yield (0, s3_controller_1.getFileURL)(`factura-${newBill.id_bill}.html`);
        const updatedBill = yield bill_models_1.default.update({ address: fileURL }, { where: {
                id_bill: newBill.id_bill,
            } });
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'justasimpleman1212@gmail.com',
                pass: 'ntxsbjtfqtpdnhcs'
            },
        });
        let supplierMail = yield transporter.sendMail({
            from: 'justasimpleman1212@gmail.com',
            to: purchaseUser === null || purchaseUser === void 0 ? void 0 : purchaseUser.email,
            subject: 'Felicidades, ha ganado una subasta',
            html: `<h1>Usted  ha ganado una subasta por el producto: ${updatedAuction === null || updatedAuction === void 0 ? void 0 : updatedAuction.product_name}</h1>`
        });
        return res.status(200).json({
            status: true,
            msg: "Subasta terminada exitosamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.endAuction = endAuction;
function generarFacturaHtml(datosFactura) {
    const template = fs.readFileSync('./bill.html', 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(datosFactura);
    return html;
}
const auctionsdHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser } = req.params;
    try {
        const userAuctions = yield auction_models_1.default.findAll({
            where: {
                id_bidder: idUser,
                status: '2'
            }
        });
        let history = [];
        for (let data of userAuctions) {
            const sale_auction = yield auction_sale_models_1.default.findOne({
                where: {
                    id_auction: data.id_auction,
                }
            });
            const bill = yield bill_models_1.default.findOne({
                where: {
                    id_auction_sale: sale_auction === null || sale_auction === void 0 ? void 0 : sale_auction.id_auction_sale,
                }
            });
            history.push({
                id: sale_auction === null || sale_auction === void 0 ? void 0 : sale_auction.id_auction_sale,
                name: data.product_name,
                description: data.description,
                image: data.image,
                link: bill === null || bill === void 0 ? void 0 : bill.address,
                total: data.actual_value
            });
        }
        return res.status(201).json({ history });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
});
exports.auctionsdHistory = auctionsdHistory;
