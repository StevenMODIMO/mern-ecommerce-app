import { type Request, type Response } from "express";
import Orders from "../models/ordersModel";

const placeOrder = async (req: Request, res: Response) => {
  const { buyer, product, products, total_amount, shipping_address } = req.body;

  try {
    const newOrder = await Orders.create({
      buyer,
      product,
      products,
      total_amount,
      shipping_address,
      payment_status: "pending",
      order_status: "pending",
    });
    res.status(200).json(newOrder);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export { placeOrder };
