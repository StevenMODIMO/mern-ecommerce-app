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
exports.loginUser = exports.completeAccountCreation = exports.signupUser = exports.getUser = exports.getAllUsers = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blob_1 = require("@vercel/blob");
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
};
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authModel_1.default.find();
        return res
            .status(200)
            .json(Object.assign(Object.assign({}, users), { message: "Users returned successfully" }));
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield authModel_1.default.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ message: `User with email: ${email} not found` });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getUser = getUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, display_name } = req.body;
    const avatar = req.file;
    let avatar_url;
    try {
        const exists = yield authModel_1.default.findOne({ email });
        if (exists) {
            if (!exists.account_completed) {
                // Don't upload a new avatar, just return user for account completion
                return res.status(200).json({ incomplete: true, user: exists });
            }
            else {
                throw new Error("Email is already in use");
            }
        }
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
        const token = createToken(user._id);
        res.status(201).json(Object.assign(Object.assign({}, user.toObject()), { token }));
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.signupUser = signupUser;
const completeAccountCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    if (!email || !role) {
        return res.status(400).json({ error: "Email and role are required" });
    }
    try {
        const updatedUser = yield authModel_1.default.findOneAndUpdate({ email }, // filter
        { role, account_completed: true }, // updates
        { new: true } // return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res
            .status(200)
            .json({ message: "Account completed", user: updatedUser.toObject() });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.completeAccountCreation = completeAccountCreation;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existing_user = yield authModel_1.default.login(email, password);
        if (!existing_user.account_completed) {
            return res
                .status(200)
                .json(Object.assign({ accountIncomplete: true }, existing_user.toObject()));
        }
        const user = yield authModel_1.default.login(email, password);
        const token = createToken(user._id);
        res.status(200).json(Object.assign(Object.assign({}, user.toObject()), { token }));
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
