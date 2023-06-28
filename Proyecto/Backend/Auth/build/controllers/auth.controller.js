"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthy = void 0;
const healthy = (req, res) => {
    return res.status(200).json({ msg: 'true' });
};
exports.healthy = healthy;
