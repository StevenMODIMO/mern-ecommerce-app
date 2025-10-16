"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const buyerSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    wishlist: [
        {
            imagePath: String,
            product_name: String,
            description: String,
            price: Number,
            currency: String,
            quantity: Number,
        },
    ],
    invoices: [
        {
            cardNumber: String,
            imagePath: String,
            product_name: String,
            description: String,
            price: Number,
            currency: String,
            quantity: Number,
            prevID: String,
            completed: {
                type: Boolean,
                default: true
            },
            shipped: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
});
exports.default = mongoose_1.default.model("Buyer", buyerSchema);
