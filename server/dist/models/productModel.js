"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    image_url: String,
    name: String,
    price: Number,
    quantity: Number,
    rates: [
        {
            rate: Number,
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
            },
        },
    ],
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Auth",
    },
    seller_name: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
