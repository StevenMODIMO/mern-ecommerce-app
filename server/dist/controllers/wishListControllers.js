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
exports.removeItemFromWishList = exports.getCartItemsByUser = exports.addToWishList = void 0;
const wishlistModel_1 = __importDefault(require("../models/wishlistModel"));
const addToWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, buyer_id } = req.body;
    try {
        const wishListItem = yield wishlistModel_1.default.create({ product_id, buyer_id });
        res.status(200).json(wishListItem);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addToWishList = addToWishList;
const getCartItemsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer_id } = req.params;
    try {
        const userWishListItems = yield wishlistModel_1.default.find({ buyer_id })
            .populate("product_id")
            .lean();
        res.status(200).json(userWishListItems);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCartItemsByUser = getCartItemsByUser;
const removeItemFromWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const wishListItem = yield wishlistModel_1.default.findOneAndDelete({ product_id });
        if (!wishListItem) {
            return res.status(400).json({ error: "Product not found in wishlist" });
        }
        res.status(200).json(wishListItem);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.removeItemFromWishList = removeItemFromWishList;
