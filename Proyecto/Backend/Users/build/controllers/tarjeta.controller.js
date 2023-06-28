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
exports.deleteCard = exports.getCards = exports.postCard = exports.healthy = void 0;
const card_models_1 = __importDefault(require("../models/card.models"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const postCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { notarjeta, nombre, id } = req.body;
        const card = yield card_models_1.default.create({
            number: notarjeta,
            expiration: '17/12/2026',
            ccv: '123',
            id_customer: id,
            nombre: nombre
        });
        return res.status(200).json({
            success: true,
            message: "Tarjeta registrada exitosamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            succes: false,
            message: "Ocurrio un error al registrar la tarjeta"
        });
    }
});
exports.postCard = postCard;
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { idCliente } = req.body;
        const cards = yield card_models_1.default.findAll({
            where: {
                id_customer: idCliente,
            }
        });
        let message = [];
        for (let data of cards) {
            message.push({
                idTarjeta: data.id,
                notarjeta: data.number,
                nombre: data.nombre
            });
        }
        return res.status(200).json({
            success: true,
            message
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Ocurrio un error al consultar las tarjetas del cliente",
        });
    }
});
exports.getCards = getCards;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { idCard } = req.params;
        const deletedCard = yield card_models_1.default.destroy({
            where: {
                id: idCard,
            }
        });
        return res.status(200).json({
            status: true,
            msg: "Tarjeta eliminada con exito"
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
exports.deleteCard = deleteCard;
