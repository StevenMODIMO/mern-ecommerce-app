"use strict";
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
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const swagger_1 = require("./swagger");
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
(0, swagger_1.setupSwagger)(app);
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productsRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));
});
