"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = config_1.DB_CONFIG;
exports.db = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});
