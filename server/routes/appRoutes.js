const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const { registerSeller, registerBuyer, newProduct, getProducts, deleteProducts, placeOrder, cancelOrder, addWishList, rateProduct } = require("../controllers/appControllers")


router.use(requireAuth)

router.post("/seller", registerSeller)

router.post("/buyer", registerBuyer)

router.post("/new-product", newProduct)

router.get("/products", getProducts)

router.delete("/:id", deleteProducts)

router.post("/order", placeOrder)

router.delete("/remove-order/:id", cancelOrder)

router.post("/add-wishlist", addWishList)

router.post("/rates", rateProduct)


module.exports = router