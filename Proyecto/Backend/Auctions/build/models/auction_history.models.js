"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const History = db_1.db.define('Auction_history', {
    id_auction_history: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_auction: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    value: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_bidder: {
        type: sequelize_1.DataTypes.NUMBER,
    },
});
exports.default = History;
