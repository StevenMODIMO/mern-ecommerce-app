const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const { registerSeller, registerBuyer, newProduct, getProducts } = require("../controllers/appControllers")


router.use(requireAuth)

router.post("/seller", registerSeller)

router.post("/buyer", registerBuyer)

router.post("/new-product", newProduct)

router.get("/products", getProducts)

module.exports = router