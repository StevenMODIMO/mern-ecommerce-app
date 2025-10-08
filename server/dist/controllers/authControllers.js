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
const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Auth.signup(email, password);
        const token = createToken(user._id);
        const role = user.role;
        res.status(200).json({ email, token, role });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Auth.login(email, password);
        const token = createToken(user._id);
        const role = user.role;
        const name = user.username;
        res.status(200).json({ email, token, role, name });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = { signupUser, loginUser };
