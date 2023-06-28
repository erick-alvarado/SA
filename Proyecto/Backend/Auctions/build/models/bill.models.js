"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Bill = db_1.db.define('Bill', {
    id_bill: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_auction_sale: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_sale: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    nit: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    }
});
exports.default = Bill;
