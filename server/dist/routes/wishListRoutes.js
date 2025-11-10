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
const wishListControllers_1 = require("../controllers/wishListControllers");
const express_1 = __importStar(require("express"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: BUYER WISHLIST MANAGEMENT
 */
/**
 * @swagger
 * /api/wishlist/add-to-wishlist:
 *   post:
 *     summary: Add a product to user's wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - buyer_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: ID of the product to add to wishlist
 *               buyer_id:
 *                 type: string
 *                 description: ID of the buyer adding the product
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 product_id:
 *                   type: string
 *                 buyer_id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input or error while adding
 */
router.post("/add-to-wishlist", express_1.default.json(), wishListControllers_1.addToWishList);
/**
 * @swagger
 * /api/wishlist/user-wishlist/{buyer_id}:
 *   get:
 *     summary: Get all wishlist items for a specific buyer
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: buyer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the buyer
 *     responses:
 *       200:
 *         description: List of wishlist items for the buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   product_id:
 *                     type: string
 *                   buyer_id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error retrieving wishlist
 */
router.get("/user-wishlist/:buyer_id", wishListControllers_1.getCartItemsByUser);
/**
 * @swagger
 * /api/wishlist/remove-from-wishlist/{product_id}:
 *   delete:
 *     summary: Remove a product from user's wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 product_id:
 *                   type: string
 *                 buyer_id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Product not found or error while removing
 */
router.delete("/remove-from-wishlist/:product_id", wishListControllers_1.removeItemFromWishList);
exports.default = router;
