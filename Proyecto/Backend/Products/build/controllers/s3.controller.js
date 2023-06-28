"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileURL = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../config/config");
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = config_1.S3_CONFIG;
const client = new client_s3_1.S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});
//Uploads a file to the s3 bucket
const uploadFile = (foto) => __awaiter(void 0, void 0, void 0, function* () {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const unido = hora + ":" + minutos + ":" + segundos;
    const nombrei = unido + ".jpg";
    let buff = Buffer.from(foto, 'base64');
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: nombrei,
        Body: buff,
        ContentType: "image"
    };
    const command = new client_s3_1.PutObjectCommand(uploadParams);
    yield client.send(command);
    return nombrei;
});
exports.uploadFile = uploadFile;
//Sends a file name in the s3 bucket and returns an url to access it
const getFileURL = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    });
    return (AWS_BUCKET_URL + filename);
});
exports.getFileURL = getFileURL;
