const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  orders: [
    {
      imagePath: String,
      product_name: String,
      description: String,
      price: Number,
      currency: String,
      quantity: Number,
      address: String,
      completed: {
        type: Boolean,
        default: false,
      },
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
});

module.exports = mongoose.model("Buyer", buyerSchema);
