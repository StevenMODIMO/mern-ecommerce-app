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
exports.placeOrder = void 0;
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer, product, products, total_amount, shipping_address } = req.body;
    try {
        const newOrder = yield ordersModel_1.default.create({
            buyer,
            product,
            products,
            total_amount,
            shipping_address,
            payment_status: "pending",
            order_status: "pending",
        });
        res.status(200).json(newOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.placeOrder = placeOrder;
