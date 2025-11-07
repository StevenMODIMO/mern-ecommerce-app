import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
  buyer_id: mongoose.Schema.Types.ObjectId,
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

export default model("Cart", cartSchema);
