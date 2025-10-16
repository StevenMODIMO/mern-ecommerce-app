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
exports.signupUser = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blob_1 = require("@vercel/blob");
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, display_name } = req.body;
    const avatar = req.file;
    let avatar_url;
    try {
        const avatarContent = avatar && avatar.buffer;
        if (avatar) {
            const { url } = yield (0, blob_1.put)(`cdn.mern-store/${avatar === null || avatar === void 0 ? void 0 : avatar.originalname}`, avatarContent, {
                access: "public",
                contentType: avatar === null || avatar === void 0 ? void 0 : avatar.mimetype,
                allowOverwrite: true,
            });
            avatar_url = url;
        }
        const user = yield authModel_1.default.signup(email, password, display_name, avatar_url || "");
        // const token = createToken(user._id);
        // const user_role = user.role;
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.signupUser = signupUser;
