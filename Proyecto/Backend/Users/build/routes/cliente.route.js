"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controllers/cliente.controller");
const router = (0, express_1.Router)();
/**
 * host + /user/ping
*/
router.get('/ping', cliente_controller_1.healthy);
/**
 * host + /user/postUser
*/
router.post('/Registrar', cliente_controller_1.postUser);
/**
 * host + user/getUser/:idUser
 */
router.get('/getUser/:idUser', cliente_controller_1.getUser);
exports.default = router;
