"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appControllers_1 = require("../controllers/appControllers");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
router.use(requireAuth_1.default);
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
router.get("/", appControllers_1.getAllProducts);
router.post("/seller", appControllers_1.registerSeller);
router.post("/buyer", appControllers_1.registerBuyer);
router.post("/new-product", upload.single("image"), appControllers_1.newProduct);
router.get("/products", appControllers_1.getProducts);
router.get("/product/:id", appControllers_1.getProductById);
router.delete("/:id", appControllers_1.deleteProducts);
router.get("/business-orders/:name", appControllers_1.getOrders);
router.get("/order/:id", appControllers_1.getSingleProduct);
router.post("/cart", appControllers_1.addToCart);
router.get("/orders", appControllers_1.getCartProducts);
router.get("/item/:id", appControllers_1.getCartProduct);
router.delete("/remove-from-cart/:id", appControllers_1.removeFromCart);
router.post("/add-wishlist", appControllers_1.addWishList);
router.get("/get-wishlist", appControllers_1.getWishlistProducts);
router.get("/get-wishlist/:id", appControllers_1.getSingleWishListProduct);
router.delete("/remove-wishlist/:id", appControllers_1.removeWishList);
router.post("/pay", appControllers_1.intitiatePayment);
router.get("/buyer-invoice", appControllers_1.generateBuyerInvoice);
router.get("/seller-invoice", appControllers_1.generateSellerInvoice);
router.post("/ship/:id", appControllers_1.shipProduct);
exports.default = router;
