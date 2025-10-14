import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    business_name: {
      type: String,
    },
    address: {
      type: String,
    },
    products: [
      {
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
        category: {
          type: String,
        },
      },
    ],
    rates: [
      {
        product_id: { type: String },
        rate: {
          type: Number,
          default: 0,
        },
      },
    ],
    orders: [
      {
        from: String,
        imagePath: String,
        product_name: String,
        description: String,
        price: String,
        currency: String,
        quantity: String,
        address: String,
        shipped: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
