"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Customer = db_1.db.define('Customer', {
    id_customer: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone_number: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    photografy: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_user: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = Customer;
