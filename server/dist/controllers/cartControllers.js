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
exports.getCartItemsByUser = exports.addProductToCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, buyer_id, quantity } = req.body;
    try {
        const cartItem = yield cartModel_1.default.create({ product_id, buyer_id, quantity });
        res.status(200).json(cartItem);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addProductToCart = addProductToCart;
const getCartItemsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer_id } = req.params;
    try {
        const userCartItems = yield cartModel_1.default.find({ buyer_id })
            .populate({
            path: "product_id",
            select: "name image_url price quantity seller_name", // only these fields
        })
            .lean();
        const cartResponse = userCartItems.map((item) => ({
            _id: item._id,
            buyer_id: item.buyer_id,
            quantity: item.quantity,
            product: item.product_id, // populated subset
        }));
        res.status(200).json(cartResponse);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCartItemsByUser = getCartItemsByUser;
