"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Auction = db_1.db.define('Auction', {
    id_auction: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    initial_value: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    actual_value: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    deadline: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_seller: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_bidder: {
        type: sequelize_1.DataTypes.NUMBER,
    },
});
exports.default = Auction;
