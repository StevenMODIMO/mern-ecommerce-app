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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = require("bcrypt");
const validator_1 = require("validator");
const userSchema = new mongoose_1.default.Schema({
    display_name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["buyer", "seller", "merchant"],
        default: "buyer",
    },
    cart: [
        {
            from: String,
            imagePath: String,
            product_name: String,
            description: String,
            price: Number,
            currency: String,
            quantity: Number,
        },
    ],
});
userSchema.statics.signup = function (display_name, email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password)
            throw Error("All fields must be filled");
        if (!(0, validator_1.isEmail)(email))
            throw Error("Invalid Email");
        if (!(0, validator_1.isStrongPassword)(password))
            throw Error("Password must contain upper and lowercase letters, numbers and special characters");
        const exists = yield this.findOne({ email });
        if (exists)
            throw Error("User exists");
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const hashed = yield (0, bcrypt_1.hash)(password, salt);
        const user = yield this.create({
            email,
            password: hashed,
            display_name,
            role,
        });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password)
            throw Error("All fields must be filled");
        const user = yield this.findOne({ email });
        if (!user)
            throw Error("Incorrect email");
        const match = yield (0, bcrypt_1.compare)(password, user.password);
        if (!match)
            throw Error("Incorrect Password");
        return user;
    });
};
exports.default = mongoose_1.default.model("Auth", userSchema);
