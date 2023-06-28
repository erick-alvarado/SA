"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Sale = db_1.db.define('Sale', {
    id_sale: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
    },
    total: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_customer: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = Sale;
