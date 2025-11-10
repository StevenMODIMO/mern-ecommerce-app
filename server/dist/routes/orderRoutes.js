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
const orderControllers_1 = require("../controllers/orderControllers");
const express_1 = __importStar(require("express"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Buyer and Seller order management
 */
/**
 * @swagger
 * /api/orders/place-order:
 *   post:
 *     summary: Place a new order
 *     description: Allows a buyer to place an order for one or more products.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyer
 *               - products
 *               - shipping_address
 *             properties:
 *               buyer:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - seller
 *                     - price
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                     seller:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               shipping_address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       500:
 *         description: Server error
 */
router.post("/place-order", express_1.default.json(), orderControllers_1.placeOrder);
/**
 * @swagger
 * /api/orders/user/{buyerId}:
 *   get:
 *     summary: Get all orders of a buyer
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get("/user/:buyerId", orderControllers_1.getBuyerOrders);
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get single order details
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", orderControllers_1.getSingleOrder);
/**
 * @swagger
 * /api/orders/cancel/{orderId}/{productId}:
 *   patch:
 *     summary: Cancel a product in an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product cancelled successfully
 *       403:
 *         description: Cannot cancel shipped/completed product
 *       404:
 *         description: Order or product not found
 */
router.patch("/cancel/:orderId/:productId", orderControllers_1.cancelOrder);
/**
 * @swagger
 * /api/orders/seller/{sellerId}:
 *   get:
 *     summary: Get all orders containing a seller's products
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders containing seller's products
 */
router.get("/seller/:sellerId", orderControllers_1.getSellerOrders);
exports.default = router;
