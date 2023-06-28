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
exports.getCategory = exports.healthy = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_models_1.default.findAll();
        return res.status(201).json({
            category
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
        });
    }
});
exports.getCategory = getCategory;
