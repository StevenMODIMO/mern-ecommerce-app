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
exports.deleteProduct = exports.updateProductDetails = exports.getSellerProducts = exports.getSingleProduct = exports.getAllProducts = exports.addNewProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const blob_1 = require("@vercel/blob");
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity, seller, seller_name } = req.body;
    const image = req.file;
    let image_url;
    try {
        const imageContent = image && image.buffer;
        if (!imageContent ||
            !name ||
            !price ||
            !quantity ||
            !seller ||
            !seller_name) {
            return res.status(400).json({ error: "All fields are required." });
        }
        if (image) {
            const { url } = yield (0, blob_1.put)(`cdn.mern-store/products/${image === null || image === void 0 ? void 0 : image.originalname}`, imageContent, {
                access: "public",
                contentType: image === null || image === void 0 ? void 0 : image.mimetype,
                allowOverwrite: true,
            });
            image_url = url;
        }
        const newProduct = yield productModel_1.default.create({
            image_url,
            name,
            price,
            quantity,
            seller,
            seller_name,
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addNewProduct = addNewProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find().populate("seller");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const product = yield productModel_1.default.findOne({ _id: product_id });
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getSingleProduct = getSingleProduct;
const getSellerProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seller_id } = req.params;
    try {
        const products = yield productModel_1.default.find({
            seller: seller_id,
        });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getSellerProducts = getSellerProducts;
const updateProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    const { name, price, quantity } = req.body;
    const image = req.file;
    let image_url;
    try {
        // Find existing product
        const product = yield productModel_1.default.findOne({ _id: product_id });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        // If new image uploaded, delete old image first
        if (image) {
            if (product.image_url) {
                yield (0, blob_1.del)(product.image_url);
            }
            const { url } = yield (0, blob_1.put)(`cdn.mern-store/products/${image.originalname}`, image.buffer, {
                access: "public",
                contentType: image.mimetype,
                allowOverwrite: true,
            });
            image_url = url;
        }
        // Prepare update object with only provided fields
        const updateData = {};
        if (name)
            updateData.name = name;
        if (price)
            updateData.price = price;
        if (quantity)
            updateData.quantity = quantity;
        if (image_url)
            updateData.image_url = image_url;
        // Update only specified fields
        const updatedProduct = yield productModel_1.default.findOneAndUpdate({ _id: product_id }, { $set: updateData }, { new: true, runValidators: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.updateProductDetails = updateProductDetails;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const product = yield productModel_1.default.findOne({ _id: product_id });
        if (!product) {
            return res
                .status(400)
                .json({ error: `Product with id: ${product_id} was not found` });
        }
        const urlToDelete = product.image_url;
        if (urlToDelete) {
            yield (0, blob_1.del)(urlToDelete);
        }
        yield productModel_1.default.findOneAndDelete({ _id: product_id });
        res.status(200).json({
            message: `Product with id: ${product_id} has been deleted successfully.`,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.deleteProduct = deleteProduct;
