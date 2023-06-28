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
const category_route_1 = __importDefault(require("./routes/category.route"));
const inventario_route_1 = __importDefault(require("./routes/inventario.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const db_1 = require("./database/db");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const POINT = 'Proveedor';
const POINT2 = 'Inventario';
const POINT3 = 'product';
// settings
app.set('port', PORT);
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
app.use(express_1.default.json({ limit: '100mb' }));
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
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
// routes
app.use(`/${POINT}`, category_route_1.default);
app.use(`/${POINT2}`, inventario_route_1.default);
app.use(`/${POINT3}`, product_route_1.default);
const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`));
};
main();
