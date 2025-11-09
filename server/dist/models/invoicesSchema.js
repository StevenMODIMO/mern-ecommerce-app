"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const invoicesSchema = new mongoose_1.Schema({
    order_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Orders",
        required: true,
    },
    buyer_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    seller_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    products: [
        {
            product_id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    total_amount: {
        type: Number,
        required: true,
    },
    payment_details: {
        method: String,
        transaction_id: String,
    },
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "paid",
    },
    issued_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Invoice", invoicesSchema);
