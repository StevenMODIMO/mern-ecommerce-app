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
