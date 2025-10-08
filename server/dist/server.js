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
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
app.get("/", (req, res) => {
    res.send("MERN Ecommerce");
});
app.get("/images/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path.join(__dirname, "images", req.params.filename);
    res.sendFile(imagePath);
}));
app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
    app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));
});
