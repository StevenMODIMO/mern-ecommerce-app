import dotenv from "dotenv";
import Product from "../models/productModel";
import { type Request, type Response } from "express";
import { put } from "@vercel/blob";

const addNewProduct = async (req: Request, res: Response) => {
  const { name, price, quantity, seller, seller_name } = req.body;
  const image = req.file;
  let image_url;

  try {
    const imageContent = image && image.buffer;
    if (
      !imageContent ||
      !name ||
      !price ||
      !quantity ||
      !seller ||
      !seller_name
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (image) {
      const { url } = await put(
        `cdn.mern-store/products/${image?.originalname}`,
        imageContent as Buffer,
        {
          access: "public",
          contentType: image?.mimetype,
          allowOverwrite: true,
        }
      );
      image_url = url;
    }

    const newProduct = await Product.create({
      image_url,
      name,
      price,
      quantity,
      seller,
      seller_name,
    });

    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getSellerProducts = async (req: Request, res: Response) => {
  const { seller_id } = req.params;

  try {
    const products = await Product.find({
      "seller_details.seller_id": seller_id,
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const updateProductDetails = async (req: Request, res: Response) => {};

export {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  getSellerProducts,
  updateProductDetails,
};
