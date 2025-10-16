"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipProduct = exports.generateSellerInvoice = exports.generateBuyerInvoice = exports.intitiatePayment = exports.getOrders = exports.removeWishList = exports.getSingleWishListProduct = exports.getWishlistProducts = exports.addWishList = exports.removeFromCart = exports.getCartProduct = exports.getCartProducts = exports.addToCart = exports.deleteProducts = exports.getImage = exports.getProductById = exports.getProducts = exports.editProduct = exports.newProduct = exports.getSingleProduct = exports.registerBuyer = exports.registerSeller = exports.getAllProducts = void 0;
require("dotenv").config();
const businessModel_1 = __importDefault(require("../models/businessModel"));
const buyerModel_1 = __importDefault(require("../models/buyerModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const authModel_1 = __importDefault(require("../models/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_1 = __importDefault(require("stripe"));
const path = require("path");
const mongodb_1 = require("mongodb");
const STRIPE = process.env.STRIPE_PRIVATE_KEY;
// Admin Controllers
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield productModel_1.default.find();
        res.status(200).json(docs);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllProducts = getAllProducts;
const registerSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { business_name, address } = req.body;
    const user_id = new mongoose_1.default.Types.ObjectId(req.user);
    if (!business_name || !address) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    const exists = yield businessModel_1.default.findOne({ business_name });
    if (exists) {
        return res.status(400).json({ error: "Name already taken" });
    }
    try {
        const updateUser = yield authModel_1.default.findOneAndUpdate({ _id: user_id }, { role: "Seller" }, { new: true });
        const newSeller = yield businessModel_1.default.create({
            user_id: user_id,
            business_name: business_name,
            address: address,
        });
        res.status(200).json(updateUser.role);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.registerSeller = registerSeller;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { product_name, description, price, quantity, currency, category } = req.body;
    if (!req.file ||
        !product_name ||
        !description ||
        !price ||
        !quantity ||
        !currency ||
        !category) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    const imagePath = path.normalize(req.file.path).replace(/\\/g, "/");
    try {
        const newItem = {
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            quantity: quantity,
            currency: currency,
            category: category,
        };
        const newProduct = yield businessModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $push: {
                products: newItem,
            },
        }, { new: true });
        const newID = { pid: "" };
        const n = newProduct.products.filter((p) => {
            if (p.product_name == newItem.product_name) {
                newID.pid = p.id;
            }
        });
        const product = yield productModel_1.default.create({
            product_id: newID.pid,
            from: newProduct.business_name,
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            quantity: quantity,
            currency: currency,
            category: category,
        });
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.newProduct = newProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { product_name, description, price, quantity, currency, category } = req.body;
    if (!req.file ||
        !product_name ||
        !description ||
        !price ||
        !quantity ||
        !currency ||
        !category) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    const imagePath = path.normalize(req.file.path).replace(/\\/g, "/");
    try {
        const editedProduct = yield businessModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $push: {
                products: {
                    imagePath: imagePath,
                    product_name: product_name,
                    description: description,
                    price: price,
                    quantity: quantity,
                    currency: currency,
                    category: category,
                },
            },
        }, { new: true });
        res.status(200).json(editedProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editProduct = editProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    try {
        const products = yield businessModel_1.default.findOne({ user_id });
        res.status(200).json(products.products);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    try {
        const { id } = req.params;
        const updated = yield businessModel_1.default.findOne({ user_id: user_id });
        updated.products.filter((product) => {
            if (product._id == id) {
                res.status(200).json(product);
            }
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getProductById = getProductById;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = path.join(__dirname, "..", "images", req.params.filename);
        res.sendFile(image);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getImage = getImage;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user_id = req.user;
    try {
        const deletedProduct = yield businessModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $pull: {
                products: {
                    _id: id,
                },
            },
        }, { new: true });
        const deleteFromProduct = yield productModel_1.default.findOneAndDelete({ product_id: id }, { new: true });
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.deleteProducts = deleteProducts;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const business_orders = yield buyerModel_1.default.find({ "orders.business_name": name });
        res.status(200).json(business_orders);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getOrders = getOrders;
// User Controllers
const registerBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = new mongoose_1.default.Types.ObjectId(req.user);
    try {
        const updateUser = yield authModel_1.default.findOneAndUpdate({ _id: user_id }, { role: "Buyer" }, { new: true });
        const newUser = yield buyerModel_1.default.create({ user_id: user_id });
        res.status(200).json(updateUser.role);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.registerBuyer = registerBuyer;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doc = yield productModel_1.default.findOne({ _id: id });
        res.status(200).json(doc);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getSingleProduct = getSingleProduct;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { imagePath, product_name, description, price, currency, quantity, rate, product_id, business_name, } = req.body;
    if (!quantity) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    try {
        const newProduct = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $push: {
                cart: {
                    from: business_name,
                    imagePath: imagePath,
                    product_name: product_name,
                    description: description,
                    price: price,
                    currency: currency,
                    quantity: quantity,
                },
            },
        }, { new: true });
        const rateProduct = yield productModel_1.default.findOneAndUpdate({ product_id: product_id }, {
            $push: {
                rates: {
                    rate: rate,
                    user: user_id,
                },
            },
        });
        const rateToSeller = yield businessModel_1.default.findOneAndUpdate({ business_name: business_name }, {
            $push: {
                rates: {
                    product_id: product_id,
                    rate: rate,
                },
            },
        });
        const remove = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $pull: {
                wishlist: {
                    _id: newProduct._id,
                },
            },
        });
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addToCart = addToCart;
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    try {
        const orders = yield buyerModel_1.default.findOne({ user_id: user_id });
        const userOrders = orders.cart;
        res.status(200).json(userOrders);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCartProducts = getCartProducts;
const getCartProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { id } = req.params;
    try {
        const orders = yield buyerModel_1.default.findOne({ user_id: user_id });
        const cart = orders.cart;
        cart.filter((order) => {
            if (order._id == id) {
                res.status(200).json(order);
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});
exports.getCartProduct = getCartProduct;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user_id = req.user;
    try {
        const deletedProduct = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $pull: {
                cart: {
                    _id: id,
                },
            },
        });
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.removeFromCart = removeFromCart;
const addWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { product_name, description, price, currency, quantity, imagePath } = req.body;
    if (!quantity) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    try {
        const newProduct = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $push: {
                wishlist: {
                    imagePath: imagePath,
                    product_name: product_name,
                    description: description,
                    price: price,
                    currency: currency,
                    quantity: quantity,
                },
            },
        }, { new: true });
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addWishList = addWishList;
const getWishlistProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    try {
        const wishList = yield buyerModel_1.default.findOne({ user_id: user_id });
        const userWishList = wishList.wishlist;
        res.status(200).json(userWishList);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getWishlistProducts = getWishlistProducts;
const getSingleWishListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { id } = req.params;
    try {
        const wishList = yield buyerModel_1.default.findOne({ user_id: user_id });
        const userWishList = wishList.wishlist;
        userWishList.filter((uw) => {
            if (uw._id == id) {
                res.status(200).json(uw);
            }
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getSingleWishListProduct = getSingleWishListProduct;
const removeWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { id } = req.params;
    try {
        const remove = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $pull: {
                wishlist: {
                    _id: id,
                },
            },
        });
        res.status(200).json(remove);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.removeWishList = removeWishList;
const intitiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { cardNumber, cardExpMonth, cardExpYear, cardCvc, product_name, description, price, currency, quantity, imagePath, prevID, address, from, business_name, } = req.body;
    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCvc) {
        return res.status(400).json({ error: "All fields must be filled." });
    }
    try {
        const payment = yield stripe_1.default.paymentMethods.create({
            type: "card",
            card: {
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCvc,
            },
        });
        const sendToInvoice = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $push: {
                invoices: {
                    cardNumber: cardNumber,
                    imagePath: imagePath,
                    product_name: product_name,
                    description: description,
                    price: price,
                    currency: currency,
                    quantity: quantity,
                    prevID: prevID,
                },
            },
        }, { new: true });
        const remove = yield buyerModel_1.default.findOneAndUpdate({ user_id: user_id }, {
            $pull: {
                cart: {
                    _id: new mongodb_1.ObjectId(prevID),
                },
            },
        });
        const sendToSellerInvoice = yield businessModel_1.default.findOneAndUpdate({ business_name: business_name }, {
            $push: {
                orders: {
                    from: from,
                    imagePath: imagePath,
                    product_name: product_name,
                    description: description,
                    price: price,
                    currency: currency,
                    quantity: quantity,
                    address: address,
                },
            },
        });
        res.status(200).json({ valid: true });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.intitiatePayment = intitiatePayment;
const generateBuyerInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    try {
        const invoice = yield buyerModel_1.default.findOne({ user_id: user_id });
        const invoices = invoice.invoices;
        res.status(200).json(invoices);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.generateBuyerInvoice = generateBuyerInvoice;
const generateSellerInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const invoice = yield businessModel_1.default.findOne({ user_id: user_id });
    const invoices = invoice.orders;
    res.status(200).json(invoices);
});
exports.generateSellerInvoice = generateSellerInvoice;
const shipProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const { id } = req.params;
    try {
        const ship = yield businessModel_1.default.findOneAndUpdate({ user_id, "orders.id": id }, {
            $set: {
                "orders.$.shipped": true,
            },
        }, { new: true });
        res.status(200).json(ship);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.shipProduct = shipProduct;
