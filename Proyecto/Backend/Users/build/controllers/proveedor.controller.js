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
exports.registrarProveedor = exports.healthy = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const registrarProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, pass, Nombre_Empresa, Direccion } = req.body;
        //Check if the email is already in use 
        const getUser = yield user_models_1.default.findAll({
            where: {
                email: correo,
            }
        });
        if (getUser.length > 0) {
            return res.status(301).json({
                success: false,
                message: "Ocurrio un error al crear el usuario"
            });
        }
        const newUser = yield user_models_1.default.create({
            email: correo,
            password: pass,
            rol: 2,
        });
        const newSupplier = yield supplier_models_1.default.create({
            brand: Nombre_Empresa,
            address: Direccion,
            id_user: newUser.id_user,
        });
        return res.status(200).json({
            success: true,
            message: "Usuario creado exitosamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Ocurrio un error al crear el usuario"
        });
    }
});
exports.registrarProveedor = registrarProveedor;
