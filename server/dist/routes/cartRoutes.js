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
const express_1 = __importStar(require("express"));
const cartControllers_1 = require("../controllers/cartControllers");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Store
 *   description: THIS API PROVIDES FUNCTIONALITIES FOR USERS TO INTERACT WITH ECOMMERCE STORE FOR USERS WITH ROLE OF BUYERS
 */
/**
 * @swagger
 * /api/cart/add-to-cart:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: Adds a selected product to a buyer's shopping cart.
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - buyer_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add
 *                 example: 674edc84d65f23b44a1b29de
 *               buyer_id:
 *                 type: string
 *                 description: The ID of the buyer adding the product
 *                 example: 68fe8b73f31097ea6b513157
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product successfully added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6754a8c1ef21f482c47f3b27
 *                 product_id:
 *                   type: string
 *                   example: 674edc84d65f23b44a1b29de
 *                 buyer_id:
 *                   type: string
 *                   example: 68fe8b73f31097ea6b513157
 *                 quantity:
 *                   type: number
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   example: 2025-11-07T19:22:14.123Z
 *                 updatedAt:
 *                   type: string
 *                   example: 2025-11-07T19:22:14.123Z
 *       400:
 *         description: Invalid request or error adding to cart
 */
router.post("/add-to-cart", express_1.default.json(), cartControllers_1.addProductToCart);
/**
 * @swagger
 * /api/cart/cart-items/{buyer_id}:
 *   get:
 *     summary: Get cart items respective to the user
 *     description: Fetches all cart items for a given buyer. Each item includes product details (name, image, price, quantity).
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: buyer_id
 *         required: true
 *         description: MongoDB ObjectId of the buyer
 *         schema:
 *           type: string
 *           example: 68fe8b73f31097ea6b513157
 *     responses:
 *       200:
 *         description: List of cart items for the buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6754a8c1ef21f482c47f3b27
 *                   buyer_id:
 *                     type: string
 *                     example: 68fe8b73f31097ea6b513157
 *                   product_id:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 674edc84d65f23b44a1b29de
 *                       name:
 *                         type: string
 *                         example: "Wireless Bluetooth Headphones"
 *                       image_url:
 *                         type: string
 *                         example: "https://cdn.example.com/images/product-1.jpg"
 *                       price:
 *                         type: number
 *                         example: 59.99
 *                       quantity:
 *                         type: number
 *                         example: 120
 *                       seller_name:
 *                         type: string
 *                         example: "TechZone"
 *                   quantity:
 *                     type: number
 *                     example: 2
 *       404:
 *         description: Buyer not found or cart empty
 *       500:
 *         description: Server error
 */
router.get("/cart-items/:buyer_id", cartControllers_1.getCartItemsByUser);
exports.default = router;
