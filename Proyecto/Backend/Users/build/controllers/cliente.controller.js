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
const user_models_1 = __importDefault(require("../models/user.models"));
const customer_models_1 = __importDefault(require("../models/customer.models"));
const supplier_models_1 = __importDefault(require("../models/supplier.models"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../config/config");
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = config_1.S3_CONFIG;
const client = new client_s3_1.S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { nombre, apellido, cel, correo, pass, imagen } = req.body;
        const fechaActual = new Date();
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();
        const unido = hora + ":" + minutos + ":" + segundos;
        const nombrei = unido + ".jpg";
        const cadenaRecortada = imagen.split(",")[1];
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
        const newUser = yield user_models_1.default.create({
            email: correo,
            password: pass,
            rol: 1,
        });
        const newCustomer = yield customer_models_1.default.create({
            first_name: nombre,
            last_name: apellido,
            phone_number: cel,
            photografy: url,
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
            message: "Ocurrio un error al crear el usuario",
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
