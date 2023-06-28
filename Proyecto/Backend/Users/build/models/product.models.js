"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Product = db_1.db.define('Product', {
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    stock: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_category: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_supplier: {
        type: sequelize_1.DataTypes.NUMBER,
    }
});
exports.default = Product;
