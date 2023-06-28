"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjeta_controller_1 = require("../controllers/tarjeta.controller");
const router = (0, express_1.Router)();
/**
 * host + /user/ping
*/
router.get('/ping', tarjeta_controller_1.healthy);
/**
 * host + user/postCard/:idUser
 */
router.post('/Crear', tarjeta_controller_1.postCard);
/**
 * host + user/getCards/:idUser
 */
router.post('/Listado', tarjeta_controller_1.getCards);
/**
 * host + user/deleteCard/:idCard
 */
router.delete('/deleteCard/:idCard', tarjeta_controller_1.deleteCard);
exports.default = router;
