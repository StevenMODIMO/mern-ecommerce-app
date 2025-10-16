"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const businessSchema = new mongoose_1.default.Schema({
    name: String,
    address: String,
    merchant_email: String,
    thumbnail: String,
    logo_url: String,
    description: String,
    phone: String,
});
