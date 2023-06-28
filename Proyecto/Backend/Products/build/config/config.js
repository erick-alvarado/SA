"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = exports.S3_CONFIG = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.S3_CONFIG = {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_BUCKET_URL: process.env.AWS_BUCKET_URL,
};
exports.DB_CONFIG = {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
};
