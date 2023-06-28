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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHTML = exports.getFileURL = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../config/config");
const fs_1 = __importDefault(require("fs"));
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = config_1.S3_CONFIG;
const client = new client_s3_1.S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});
//Uploads a file to the s3 bucket
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = fs_1.default.createReadStream(file.tempFilePath);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    };
    const command = new client_s3_1.PutObjectCommand(uploadParams);
    return yield client.send(command);
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
//Uploads html bill
const uploadHTML = (filename, contenidoHTML) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: filename,
        Body: contenidoHTML,
        ContentType: 'text/html'
    };
    // Realiza la carga del archivo a S3
    const command = new client_s3_1.PutObjectCommand(params);
    return yield client.send(command);
});
exports.uploadHTML = uploadHTML;
