"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const List = db_1.db.define('Favorites_list', {
    id_list: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_product: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_customer: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = List;
