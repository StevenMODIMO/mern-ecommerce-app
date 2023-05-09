const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  registerSeller,
  registerBuyer,
  newProduct,
  getProducts,
  deleteProducts,
  placeOrder,
  cancelOrder,
  addWishList,
  rateProduct,
  removeWishList,
  getOrders,
} = require("../controllers/appControllers");

const multer = require("multer");
const upload = multer({ dest: "images/" });

router.use(requireAuth);

router.post("/seller", registerSeller);

router.post("/buyer", registerBuyer);

router.post("/new-product", upload.single("image"), newProduct);

router.get("/products", getProducts);

router.delete("/:id", deleteProducts);

router.post("/order", placeOrder);

router.delete("/remove-order/:id", cancelOrder);

router.post("/add-wishlist", addWishList);

router.post("/rates", rateProduct);

router.delete("/remove-wishlist/:id", removeWishList);

router.get("/business-orders/:name", getOrders);

module.exports = router;
