const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId
    },
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
    rates:[
      {
        rate: {
          type: Number,
          default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId
    } 
      }

        ],
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
