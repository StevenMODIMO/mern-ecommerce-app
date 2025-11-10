import mongoose, { Schema, model } from "mongoose";

const ordersSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
        },
        name: String,
        price: Number,
        quantity: Number,
        order_status: {
          type: String,
          enum: ["pending", "processing", "shipped", "completed", "cancelled"],
          default: "pending",
        },
      },
    ],
    total_amount: Number,
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    shipping_address: {
      city: String,
      country: String,
    },
    payment_details: {
      method: String,
      transaction_id: String,
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
  },
  { timestamps: true }
);

export default model("Orders", ordersSchema);
