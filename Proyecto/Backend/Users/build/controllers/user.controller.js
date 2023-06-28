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
exports.getUser = exports.postUser = exports.healthy = void 0;
const s3_controller_1 = require("../controllers/s3.controller");
const user_models_1 = __importDefault(require("../models/user.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const bcrypt_1 = require("bcrypt");
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password, rol } = req.body;
        //Check if the email is already in use 
        const getUser = yield user_models_1.default.findAll({
            where: {
                email: email,
            }
        });
        if (getUser.length > 0) {
            return res.status(301).json({
                status: false,
                msg: "Ya existe un usuario registrado con el correo: " + email
            });
        }
        const hashed = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = yield user_models_1.default.create({
            email: email,
            password: hashed,
            rol: rol,
        });
        //Check if its a customer or supplier 1 = customer, 2 = supplier
        if (rol == 1) {
            (0, s3_controller_1.uploadFile)(req.files.file);
            let archivo = req.files.file;
            let fileURL = yield (0, s3_controller_1.getFileURL)(archivo.name);
            const newCustomer = yield customer_models_1.default.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                photografy: fileURL,
                id_user: newUser.id_user,
            });
        }
        else {
            const newSupplier = yield supplier_models_1.default.create({
                brand: req.body.brand,
                address: req.body.address,
                id_user: newUser.id_user,
            });
        }
        return res.status(200).json({
            status: true,
            msg: "Usuario registrado con exito, correo: " + newUser.email
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
exports.postUser = postUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { idUser } = req.params;
        const user = yield user_models_1.default.findOne({
            where: {
                id_user: idUser,
            }
        });
        //Checks if the given id is valid 
        if (user === null) {
            return res.status(400).json({
                status: false,
                msg: "No se encontro ningun usuario con el id proporcionado"
            });
        }
        //Checks if its a customer or supplier
        if (user.rol == 1) {
            const customer = yield customer_models_1.default.findOne({
                where: {
                    id_user: user.id_user,
                }
            });
            return res.status(200).json({
                status: true,
                usuario: user,
                cliente: customer
            });
        }
        else {
            const supplier = yield supplier_models_1.default.findOne({
                where: {
                    id_user: user.id_user,
                }
            });
            return res.status(200).json({
                status: true,
                usuario: user,
                proveedor: supplier
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
});
exports.getUser = getUser;
