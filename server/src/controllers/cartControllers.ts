import Cart from "../models/cartModel";
import { type Request, type Response } from "express";

const addProductToCart = async (req: Request, res: Response) => {
  const { product_id, buyer_id, quantity } = req.body;

  try {
    const cartItem = await Cart.create({ product_id, buyer_id, quantity });
    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getCartItemsByUser = async (req: Request, res: Response) => {
  const { buyer_id } = req.params;
  try {
    const userCartItems = await Cart.find({ buyer_id })
      .populate({
        path: "product_id",
        select: "name image_url price quantity seller_name", // only these fields
      })
      .lean();

    const cartResponse = userCartItems.map((item) => ({
      _id: item._id,
      buyer_id: item.buyer_id,
      quantity: item.quantity,
      product: item.product_id, // populated subset
    }));

    res.status(200).json(cartResponse);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export { addProductToCart, getCartItemsByUser };
