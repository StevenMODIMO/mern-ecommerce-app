const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getAllProducts,
  registerSeller,
  registerBuyer,
  getSingleProduct,
  newProduct,
  getProducts,
  getProductById,
  getImage,
  deleteProducts,
  addToCart,
  getCartProducts,
  removeFromCart,
  addWishList,
  rateProduct,
  getWishlistProducts,
  removeWishList,
  getOrders,
} = require("../controllers/appControllers");

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

router.get("/order/:id", getSingleProduct)

router.post("/new-product", upload.single("image"), newProduct);

router.get("/products", getProducts);

router.get("/product/:id", getProductById)

router.get("/images/:filename", getImage)

router.delete("/:id", deleteProducts);

router.post("/cart", addToCart);

router.get("/orders", getCartProducts)

router.delete("/remove-from-cart/:id", removeFromCart);

router.post("/add-wishlist", addWishList);

router.post("/rates", rateProduct);

router.get("/get-wishlist", getWishlistProducts)

router.delete("/remove-wishlist/:id", removeWishList);

router.get("/business-orders/:name", getOrders);

module.exports = router;
