"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Cart = db_1.db.define('Shopping_Cart', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_customer: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_product: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = Cart;
