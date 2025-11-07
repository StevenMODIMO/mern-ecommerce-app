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
  deleteProduct,
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
 * /api/products:
 *   get:
 *     summary: Retrieve all products from the store.
 *     description: Returns all products added by various users along with seller details.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Product ID in MongoDB.
 *                     example: 690bac8228ced89e04cccc44
 *                   image_url:
 *                     type: string
 *                     description: URL to the product image.
 *                     example: https://t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com/cdn.mern-store/products/istockphoto-1370712717-612x612.jpg
 *                   name:
 *                     type: string
 *                     description: Name of the product.
 *                     example: Suzuki Jimmny
 *                   price:
 *                     type: number
 *                     description: Price of the product.
 *                     example: 200
 *                   quantity:
 *                     type: number
 *                     description: Available quantity.
 *                     example: 10
 *                   seller:
 *                     type: object
 *                     description: Seller details.
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 68fe7937a94dc39ad0a56db1
 *                       display_name:
 *                         type: string
 *                         example: Biko Steven
 *                       email:
 *                         type: string
 *                         example: bikosteven2001@gmail.com
 *                       avatar_url:
 *                         type: string
 *                         example: https://t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com/cdn.mern-store/81316521.jpg
 *                       account_completed:
 *                         type: boolean
 *                         example: true
 *                       role:
 *                         type: string
 *                         example: seller
 *                   seller_name:
 *                     type: string
 *                     description: Cached name of the seller.
 *                     example: Biko Steven
 *                   rates:
 *                     type: array
 *                     description: List of product rating objects.
 *                     items:
 *                       type: object
 *                     example: []
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-11-05T19:58:58.753Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-11-05T19:58:58.753Z
 *                   __v:
 *                     type: number
 *                     example: 0
 */

router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID.
 *     description: Returns details of a specific product including seller information.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 690d9a53b41c329473743715
 *         description: The unique ID of the product.
 *     responses:
 *       200:
 *         description: Product returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Product ID in MongoDB.
 *                   example: 690bac8228ced89e04cccc44
 *                 image_url:
 *                   type: string
 *                   description: URL to the product image.
 *                   example: https://t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com/cdn.mern-store/products/istockphoto-1370712717-612x612.jpg
 *                 name:
 *                   type: string
 *                   description: Name of the product.
 *                   example: Suzuki Jimmny
 *                 price:
 *                   type: number
 *                   description: Price of the product.
 *                   example: 200
 *                 quantity:
 *                   type: number
 *                   description: Available quantity.
 *                   example: 10
 *                 seller:
 *                   type: string
 *                   description: MongoDB ID reference to the seller.
 *                   example: 68fe7937a94dc39ad0a56db1
 *                 seller_name:
 *                   type: string
 *                   description: Cached name of the seller.
 *                   example: Biko Steven
 *                 rates:
 *                   type: array
 *                   description: List of product rating objects.
 *                   items:
 *                     type: object
 *                   example: []
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-11-05T19:58:58.753Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-11-05T19:58:58.753Z
 *                 __v:
 *                   type: number
 *                   example: 0
 *       404:
 *         description: Product not found.
 */

router.get("/:product_id", getSingleProduct);

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

/**
 * @swagger
 * /api/products/update-product/{product_id}:
 *   put:
 *     summary: Sellers can update various details of their products.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: Unique product identifier.
 *         schema:
 *           type: string
 *           example: 66fcd3d97b12a2034a0fbc23
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gaming Console Pro
 *               price:
 *                 type: number
 *                 example: 250
 *               quantity:
 *                 type: number
 *                 example: 8
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional product image to replace the existing one.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 690d9bc8f0534e402435fc1f
 *                 image_url:
 *                   type: string
 *                   example: https://t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com/cdn.mern-store/products/istockphoto-1273404833-612x612.jpg
 *                 name:
 *                   type: string
 *                   example: Gaming Console
 *                 price:
 *                   type: number
 *                   example: 200
 *                 quantity:
 *                   type: number
 *                   example: 10
 *                 seller:
 *                   type: string
 *                   example: 68fe7937a94dc39ad0a56db1
 *                 seller_name:
 *                   type: string
 *                   example: Biko Steven
 *                 rates:
 *                   type: array
 *                   items: {}
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-11-07T07:12:08.785Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-11-07T07:12:08.785Z
 *                 __v:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: Invalid request or missing fields.
 *       404:
 *         description: Product not found.
 */

router.put(
  "/update-product/:product_id",
  upload.single("image"),
  updateProductDetails
);

/**
 * @swagger
 * /api/products/delete-product/{product_id}:
 *   delete:
 *     summary: Delete products from the store.
 *     description: Sellers can delete products they no longer sell or are out of order.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: Unique identifier for the products to be deleted
 *         schema:
 *           type: string
 *           example: 66fcd3d97b12a2034a0fbc23
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product with id {product_id} has been deleted successfully.
 *       400:
 *         description: Product deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product with id {product_id} was not found
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

router.delete("/delete-product/:product_id", deleteProduct);

export default router;
