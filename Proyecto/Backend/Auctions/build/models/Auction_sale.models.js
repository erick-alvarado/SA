"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Sale = db_1.db.define('Auction_sale', {
    id_auction_sale: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_auction: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = Sale;
