import {
  addToWishList,
  getCartItemsByUser,
  removeItemFromWishList,
} from "../controllers/wishListControllers";
import express, { Router } from "express";

const router = Router();

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
router.post("/add-to-wishlist", express.json(), addToWishList);

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
router.get("/user-wishlist/:buyer_id", getCartItemsByUser);

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
router.delete("/remove-from-wishlist/:product_id", removeItemFromWishList);

export default router;
