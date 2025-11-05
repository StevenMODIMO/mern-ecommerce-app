import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image_url: String,
    name: String,
    price: Number,
    quantity: Number,
    rates: [
      {
        rate: Number,
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    seller_name: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
