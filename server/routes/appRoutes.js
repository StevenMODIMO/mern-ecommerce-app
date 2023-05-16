const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  registerSeller,
  registerBuyer,
  newProduct,
  getProducts,
  getProductById,
  getImage,
  deleteProducts,
  placeOrder,
  cancelOrder,
  addWishList,
  rateProduct,
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

router.post("/seller", registerSeller);

router.post("/buyer", registerBuyer);

router.post("/new-product", upload.single("image"), newProduct);

router.get("/products", getProducts);

router.get("/product/:id", getProductById)

router.get("/images/:filename", getImage)

router.delete("/:id", deleteProducts);

router.post("/order", placeOrder);

router.delete("/remove-order/:id", cancelOrder);

router.post("/add-wishlist", addWishList);

router.post("/rates", rateProduct);

router.delete("/remove-wishlist/:id", removeWishList);

router.get("/business-orders/:name", getOrders);

module.exports = router;
