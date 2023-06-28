"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../controllers/content.controller");
const content_controller_2 = require("../controllers/content.controller");
const router = (0, express_1.Router)();
router.get('/ping', content_controller_1.healthy);
router.get('/getCategory', content_controller_2.getCategory);
exports.default = router;
