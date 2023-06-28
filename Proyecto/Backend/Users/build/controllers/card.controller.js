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
        let { number, expiration, ccv, id_customer } = req.body;
        //Check if the card is already in use by the same user
        const repeatedCard = yield card_models_1.default.findAll({
            where: {
                number: number,
                id_customer: id_customer,
            }
        });
        if (repeatedCard.length > 0) {
            return res.status(301).json({
                status: false,
                msg: "La tarjeta xxxx xxxx xxxx " + number.slice(-5) + " ya se encuentra registrada por el mismo usuario  "
            });
        }
        //Check if the card has 16 digits
        if (number.length !== 16) {
            return res.status(301).json({
                status: false,
                msg: "La numberacion de la tarjeta es invalida"
            });
        }
        const card = yield card_models_1.default.create({
            number: number,
            expiration: expiration,
            ccv: ccv,
            id_customer: id_customer,
        });
        return res.status(200).json({
            status: true,
            msg: "Tarjeta xxxx xxxx xxxx " + number.slice(-5) + " anadida con exito"
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
exports.postCard = postCard;
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { idUser } = req.params;
        const cards = yield card_models_1.default.findAll({
            where: {
                id_customer: idUser,
            }
        });
        return res.status(200).json({
            status: true,
            tarjetas: cards
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
