import { type Request, type Response } from "express";
import WishList from "../models/wishlistModel";

const addToWishList = async (req: Request, res: Response) => {
  const { product_id, buyer_id } = req.body;

  try {
    const wishListItem = await WishList.create({ product_id, buyer_id });
    res.status(200).json(wishListItem);
  } catch (error: any) {
    res.status(400).json(error);
  }
};
const getCartItemsByUser = async (req: Request, res: Response) => {
  const { buyer_id } = req.params;
  try {
    const userWishListItems = await WishList.find({ buyer_id })
      .populate("product_id")
      .lean();
    res.status(200).json(userWishListItems);
  } catch (error: any) {
    res.status(400).json(error);
  }
};
const removeItemFromWishList = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  try {
    const wishListItem = await WishList.findOneAndDelete({ product_id });
    if (!wishListItem) {
      return res.status(400).json({ error: "Product not found in wishlist" });
    }
    res.status(200).json(wishListItem);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export { addToWishList, getCartItemsByUser, removeItemFromWishList };
