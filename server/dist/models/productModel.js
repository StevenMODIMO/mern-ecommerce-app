"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_id: {
        type: String,
    },
    from: {
        type: String,
    },
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
    rates: [
        {
            rate: {
                type: Number,
                default: 0,
            },
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
            },
        },
    ],
    category: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("Product", productSchema);
