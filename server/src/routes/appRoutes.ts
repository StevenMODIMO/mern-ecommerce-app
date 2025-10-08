const router = require("express").Router();
const {
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
  shipProduct
} = require("../controllers/appControllers");


const requireAuth = require("../middleware/requireAuth");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images/")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.use(requireAuth);

router.get("/", getAllProducts)

router.post("/seller", registerSeller);

router.post("/buyer", registerBuyer);

router.post("/new-product", upload.single("image"), newProduct);

router.get("/products", getProducts);

router.get("/product/:id", getProductById)

router.delete("/:id", deleteProducts);

router.get("/business-orders/:name", getOrders);

router.get("/order/:id", getSingleProduct)

router.post("/cart", addToCart);

router.get("/orders", getCartProducts)

router.get("/item/:id", getCartProduct)

router.delete("/remove-from-cart/:id", removeFromCart);

router.post("/add-wishlist", addWishList);

router.get("/get-wishlist", getWishlistProducts)

router.get("/get-wishlist/:id", getSingleWishListProduct)

router.delete("/remove-wishlist/:id", removeWishList);

router.post("/pay", intitiatePayment)

router.get("/buyer-invoice", generateBuyerInvoice)

router.get("/seller-invoice", generateSellerInvoice)

router.post("/ship/:id", shipProduct)

module.exports = router;
