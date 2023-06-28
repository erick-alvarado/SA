"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const router = (0, express_1.Router)();
/**
 * host + /ping
*/
router.get('/ping', login_controller_1.healthy);
/**
 * host + /Login
*/
router.post('/Login', login_controller_1.login);
exports.default = router;
