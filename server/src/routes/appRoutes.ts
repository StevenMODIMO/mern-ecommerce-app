import { Router, type Request, type Response } from "express";
import {
  getAllProducts,
  registerSeller,
  registerBuyer,
  newProduct,
  getProducts,
  getProductById,
  deleteProducts,
  getOrders,
  getSingleProduct,
  addToCart,
  getCartProducts,
  getCartProduct,
  removeFromCart,
  addWishList,
  getWishlistProducts,
  getSingleWishListProduct,
  removeWishList,
  intitiatePayment,
  generateBuyerInvoice,
  generateSellerInvoice,
  shipProduct,
} from "../controllers/appControllers";

import requireAuth from "../middleware/requireAuth";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "images/");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.use(requireAuth);

// /**
//  * @swagger
//  * tags:
//  *    name: App
//  *    summary: E-commerce application functionalities
//  *    description: Endpoints for managing products, orders, cart, wishlist, and payments
//  */

// /**
//  * @swagger
//  * /api/app:
//  *   get:
//  *     summary: Retrieve a list of all products
//  *     description: Fetches all products available in the e-commerce application.
//  *     tags: [App]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved the list of products.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   product_id:
//  *                     type: string
//  *                     example: "66fcd3d97b12a2034a0fbc23"
//  *                   from:
//  *                     type: string
//  *                     example: "Sample Seller"
//  *                   imagePath:
//  *                     type: string
//  *                     example: "uploads/images/sample-product.jpg"
//  *                   product_name:
//  *                     type: string
//  *                     example: "Wireless Headphones"
//  *                   description:
//  *                     type: string
//  *                     example: "High-quality Bluetooth wireless headphones with noise cancellation."
//  *                   price:
//  *                     type: number
//  *                     example: 199.99
//  *                   quantity:
//  *                     type: number
//  *                     example: 25
//  *                   currency:
//  *                     type: string
//  *                     example: "USD"
//  *                   category:
//  *                     type: string
//  *                     example: "Electronics"
//  *                   rates:
//  *                     type: array
//  *                     items:
//  *                       type: object
//  *                       properties:
//  *                         rate:
//  *                           type: number
//  *                           example: 4.5
//  *                         user:
//  *                           type: string
//  *                           example: "6701234abcde56789f012345"
//  *       404:
//  *         description: No products found.
//  *       500:
//  *         description: Internal Server Error.
//  */

router.get("/", getAllProducts);

router.post("/seller", registerSeller);

router.post("/buyer", registerBuyer);

router.post("/new-product", upload.single("image"), newProduct);

router.get("/products", getProducts);

router.get("/product/:id", getProductById);

router.delete("/:id", deleteProducts);

router.get("/business-orders/:name", getOrders);

router.get("/order/:id", getSingleProduct);

router.post("/cart", addToCart);

router.get("/orders", getCartProducts);

router.get("/item/:id", getCartProduct);

router.delete("/remove-from-cart/:id", removeFromCart);

router.post("/add-wishlist", addWishList);

router.get("/get-wishlist", getWishlistProducts);

router.get("/get-wishlist/:id", getSingleWishListProduct);

router.delete("/remove-wishlist/:id", removeWishList);

router.post("/pay", intitiatePayment);

router.get("/buyer-invoice", generateBuyerInvoice);

router.get("/seller-invoice", generateSellerInvoice);

router.post("/ship/:id", shipProduct);

export default router;
