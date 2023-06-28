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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const sales_route_1 = __importDefault(require("./routes/sales.route"));
const shoppingCart_route_1 = __importDefault(require("./routes/shoppingCart.route"));
const compras_route_1 = __importDefault(require("./routes/compras.route"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const db_1 = require("./database/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const POINT = 'sales';
const POINTcliente = 'Cliente';
// settings
app.set('port', PORT);
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ limit: '5mb', extended: true }));
app.use(express_1.default.json({ limit: '10mb' }));
//S3
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
//DB INITIALIZATION
const dbInitialization = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.authenticate();
        console.log('Database is connected...');
    }
    catch (e) {
        console.log(e);
    }
});
dbInitialization();
// routes
app.use(`/${POINT}`, sales_route_1.default);
app.use(`/${POINT}`, shoppingCart_route_1.default);
app.use(`/${POINTcliente}`, compras_route_1.default);
const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`));
};
main();
exports.default = app;
