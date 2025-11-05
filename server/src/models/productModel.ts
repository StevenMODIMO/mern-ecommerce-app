import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller_details: {
      seller_name: String,
      seller_id: String,
    },
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
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
