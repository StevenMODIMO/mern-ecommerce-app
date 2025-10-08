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
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: { type: String, default: "None" },
});
userSchema.statics.signup = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw Error("All fields must be filled");
        }
        if (!validator.isEmail(email)) {
            throw Error("Invalid Email");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password must contain upper and lowercase letters, numbers and special characters");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw Error("User exists");
        }
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        const user = yield this.create({ email, password: hash });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw Error("All fields must be filled");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw Error("Incorrect email");
        }
        const match = yield bcrypt.compare(password, user.password);
        if (!match) {
            throw Error("Incorrect Password");
        }
        return user;
    });
};
module.exports = mongoose.model("Auth", userSchema);
