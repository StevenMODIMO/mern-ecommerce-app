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
exports.loginUser = exports.signupUser = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, display_name, role } = req.body;
    try {
        const user = yield authModel_1.default.signup(email, password, display_name, role);
        const token = createToken(user._id);
        const user_role = user.role;
        res.status(200).json({ email, token, user_role });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield authModel_1.default.login(email, password);
        const token = createToken(user._id);
        const role = user.role;
        const name = user.display_name;
        res.status(200).json({ email, token, role, name });
    }
    catch (error) {
        res.status(400).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.loginUser = loginUser;
