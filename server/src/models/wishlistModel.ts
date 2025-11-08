import mongoose, { Schema, model } from "mongoose";

const wishListSchema = new Schema({
  buyer_id: mongoose.Schema.Types.ObjectId,
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export default model("WishList", wishListSchema);
