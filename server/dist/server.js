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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const path_1 = __importDefault(require("path"));
const swagger_1 = require("./swagger");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
(0, swagger_1.setupSwagger)(app);
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
app.get("/images/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join(__dirname, "images", req.params.filename);
    res.sendFile(imagePath);
}));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/app", appRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));
});
