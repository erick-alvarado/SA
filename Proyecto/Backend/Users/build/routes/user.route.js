"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
/**
 * host + /user/ping
*/
router.get('/ping', user_controller_1.healthy);
/**
 * host + /user/postUser
*/
router.post('/postUser', user_controller_1.postUser);
/**
 * host + user/getUser/:idUser
 */
router.get('/getUser/:idUser', user_controller_1.getUser);
exports.default = router;
