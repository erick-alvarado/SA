"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const POINT = 'auth';
// settings
app.set('port', PORT);
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ limit: '5mb', extended: true }));
app.use(express_1.default.json({ limit: '10mb' }));
// routes
app.use(`/${POINT}`, auth_route_1.default);
const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`));
};
main();
