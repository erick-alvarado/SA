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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
describe("GET /getTotal", () => {
    it("retorna status code 201 y contiene los parametros necesarios", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/sales/getTotal/5")
            .expect(201);
        const { body } = res;
        expect(body).toHaveProperty('Total');
        expect(body.Total).toHaveProperty('totalSum');
        expect(body.Total).toHaveProperty('quantitySum');
        expect(body.Total).toHaveProperty('id_supplier');
    }));
    it("retorna status code 500 y no contiene los parametros necesarios", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/sales/getTotal/0")
            .expect(500);
        const { body } = res;
        expect(body).toHaveProperty('status', false);
        expect(body).toHaveProperty('msg', 'Error no existe el proveedor');
    }));
});
