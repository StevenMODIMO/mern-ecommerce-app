/**
 * @swagger
 * tags:
 *   name: Products
 *   description: This API provides functionalities to manage products in the e-commerce application for users with role of Seller.
 */
import {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  getSellerProducts,
  updateProductDetails,
} from "../controllers/productControllers";
import express, { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description:
 */

/**
 * @swagger
 * /api/products/{seller_id}:
 *   get:
 *     summary: Retrieve all products for a specific seller
 *     description: Returns a list of products belonging to the specified seller.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: seller_id
 *         required: true
 *         description: Unique identifier of the seller
 *         schema:
 *           type: string
 *           example: "66fcd3d97b12a2034a0fbc23"
 *     responses:
 *       200:
 *         description: Successfully retrieved list of products for the seller.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6700e73f8d11a541f0a1a8b2"
 *                   name:
 *                     type: string
 *                     example: "Sample Product"
 *                   price:
 *                     type: number
 *                     example: 29.99
 *                   quantity:
 *                     type: number
 *                     example: 100
 *                   image_url:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   averageRating:
 *                     type: number
 *                     example: 4.5
 *                   numRatings:
 *                     type: number
 *                     example: 12
 */

router.get("/:seller_id", getSellerProducts);

export default router;
