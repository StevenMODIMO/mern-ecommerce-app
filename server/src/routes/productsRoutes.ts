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
 * /api/products/new:
 *   post:
 *     summary: Add new product to the store
 *     description: Sellers can add new products to the store and set various fields.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - price
 *               - quantity
 *               - seller
 *               - seller_name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gaming Console
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: product image to be displated alongside product details
 *               price:
 *                 type: number
 *                 example: 200
 *               quantity:
 *                 type: number
 *                 example: 10
 *               seller:
 *                 type: string
 *                 example: 66fcd3d97b12a2034a0fbc23
 *               seller_name:
 *                 type: string
 *                 example: John Doe
 *                 description: Seller's name as set during account creation
 *     responses:
 *       201:
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 66fcd3d97b12a2034a0fbc23
 *                 name:
 *                   type: string
 *                   example: Gaming Console
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: product image to be displated alongside product details
 *                 price:
 *                   type: number
 *                   example: 200
 *                 quantity:
 *                   type: number
 *                   example: 10
 *                 seller:
 *                   type: string
 *                   example: 66fcd3d97b12a2034a0fbc23
 *                 seller_name:
 *                   type: string
 *                   example: John Doe
 *                   description: Seller's name as set during account creation
 *       400:
 *         description: Missing or Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields must be filled.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unexpected Server Error
 *
 */

router.post("/new", upload.single("image"), addNewProduct);

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
