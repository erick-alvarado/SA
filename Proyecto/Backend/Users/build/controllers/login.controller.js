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
exports.login = exports.healthy = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, pass } = req.body;
        const usuario = yield user_models_1.default.findOne({
            where: {
                email: correo,
                password: pass,
            }
        });
        let tempId, tempName, tempEmail, tempImage;
        console.log(usuario);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.rol) == 1) {
            //Customer
            const cliente = yield customer_models_1.default.findOne({
                where: {
                    id_user: usuario === null || usuario === void 0 ? void 0 : usuario.id_user,
                }
            });
            tempId = cliente === null || cliente === void 0 ? void 0 : cliente.id_customer;
            tempName = (cliente === null || cliente === void 0 ? void 0 : cliente.first_name) + (cliente === null || cliente === void 0 ? void 0 : cliente.last_name);
            tempEmail = usuario.email;
            tempImage = cliente === null || cliente === void 0 ? void 0 : cliente.photografy;
        }
        else {
            //Supplier
            const proveedor = yield supplier_models_1.default.findOne({
                where: {
                    id_user: usuario === null || usuario === void 0 ? void 0 : usuario.id_user,
                }
            });
            tempId = proveedor === null || proveedor === void 0 ? void 0 : proveedor.id_supplier;
            tempName = proveedor === null || proveedor === void 0 ? void 0 : proveedor.brand;
            tempEmail = usuario === null || usuario === void 0 ? void 0 : usuario.email;
            tempImage = "URL";
        }
        return res.status(200).json({
            success: true,
            tipo: usuario === null || usuario === void 0 ? void 0 : usuario.rol,
            message: {
                "Id": tempId,
                "Nombre": tempName,
                "Correo": tempEmail,
                "Imagen": tempImage
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "El usuario no existe"
        });
    }
});
exports.login = login;
