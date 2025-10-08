"use strict";
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    product_id: {
        type: String
    },
    from: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    product_name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    currency: {
        type: String,
    },
    rates: [
        {
            rate: {
                type: Number,
                default: 0,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
    category: {
        type: String,
    },
});
module.exports = mongoose.model("Product", productSchema);
