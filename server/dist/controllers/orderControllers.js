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
exports.getSellerOrders = exports.cancelOrder = exports.getSingleOrder = exports.getBuyerOrders = exports.placeOrder = void 0;
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
// ----------------- BUYER CONTROLLERS -----------------
// Place a new order
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyer, products, shipping_address } = req.body;
        const total_amount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newOrder = yield ordersModel_1.default.create({
            buyer,
            products,
            total_amount,
            shipping_address,
            payment_status: "pending",
        });
        // Optionally remove products from cart
        const productIds = products.map((p) => p.product);
        yield cartModel_1.default.updateOne({ buyer }, { $pull: { products: { product: { $in: productIds } } } });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.placeOrder = placeOrder;
// Get all orders of a buyer
const getBuyerOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerId } = req.params;
        const orders = yield ordersModel_1.default.find({ buyer: buyerId }).sort({
            createdAt: -1,
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getBuyerOrders = getBuyerOrders;
// Get single order details
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield ordersModel_1.default.findOne({ _id: orderId });
        if (!order)
            return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSingleOrder = getSingleOrder;
// Cancel an order (only pending products)
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, productId } = req.params;
        // Update the specific product within the array
        const updatedOrder = yield ordersModel_1.default.findOneAndUpdate({
            _id: orderId,
            "products._id": productId,
            "products.order_status": { $nin: ["shipped", "completed"] },
        }, {
            $set: { "products.$.order_status": "cancelled" },
        }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({
                error: "Order or cancellable product not found",
            });
        }
        res
            .status(200)
            .json({ message: "Product cancelled successfully", order: updatedOrder });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.cancelOrder = cancelOrder;
// ----------------- SELLER CONTROLLERS -----------------
// Get all orders containing seller's products
const getSellerOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sellerId } = req.params;
        const orders = yield ordersModel_1.default.find({ "products.seller": sellerId }).sort({
            createdAt: -1,
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSellerOrders = getSellerOrders;
