const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  cart: [
    {
      imagePath: String,
      product_name: String,
      description: String,
      price: Number,
      currency: String,
      quantity: Number,
    },
  ],
  wishlist: [
    {
      imagePath: String,
      product_name: String,
      description: String,
      price: Number,
      currency: String,
      quantity: Number,
    },
  ],
  invoices: [
    {
      cardNumber: String,
      imagePath: String,
      product_name: String,
      description: String,
      price: Number,
      currency: String,
      quantity: Number,
      prevID: String
    },
  ],
});

module.exports = mongoose.model("Buyer", buyerSchema);
