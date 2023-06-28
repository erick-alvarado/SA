"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Card = db_1.db.define('Credit_Card', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: sequelize_1.DataTypes.STRING,
    },
    expiration: {
        type: sequelize_1.DataTypes.STRING,
    },
    ccv: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_customer: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Card;
