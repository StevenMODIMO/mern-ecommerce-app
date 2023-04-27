const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    user_id: String,
    business_name: {
      type: String,
    },
    address: {
      type: String,
    },
    products: [{
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
      type: Number
    },
    currency: {
      type: String
    },
    reviews: {
      type: Number,
      default: 0,
    },
    rates: {
      type: Number,
    },
    category: {
      type: String,
    },
    available: {
      type: Boolean,
    }
  }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
