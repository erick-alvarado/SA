"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const card_controller_1 = require("../controllers/card.controller");
const router = (0, express_1.Router)();
/**
 * host + /user/ping
*/
router.get('/ping', card_controller_1.healthy);
/**
 * host + user/postCard/:idUser
 */
router.post('/postCard', card_controller_1.postCard);
/**
 * host + user/getCards/:idUser
 */
router.get('/getCards/:idUser', card_controller_1.getCards);
/**
 * host + user/deleteCard/:idCard
 */
router.delete('/deleteCard/:idCard', card_controller_1.deleteCard);
exports.default = router;
