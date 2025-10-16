"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sellerSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    business_name: {
        type: String,
    },
    address: {
        type: String,
    },
    products: [
        {
            imagePath: {
                type: String,
            },
            product_name: {
                type: String,
            },
            description: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
            currency: {
                type: String,
            },
            category: {
                type: String,
            },
        },
    ],
    rates: [
        {
            product_id: { type: String },
            rate: {
                type: Number,
                default: 0,
            },
        },
    ],
    orders: [
        {
            from: String,
            imagePath: String,
            product_name: String,
            description: String,
            price: String,
            currency: String,
            quantity: String,
            address: String,
            shipped: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Seller", sellerSchema);
