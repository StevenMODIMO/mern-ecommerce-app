import mongoose, { Schema, model } from "mongoose";

const invoicesSchema = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    payment_details: {
      method: String,
      transaction_id: String,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "paid",
    },
    issued_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("Invoice", invoicesSchema);
