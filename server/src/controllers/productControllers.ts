import dotenv from "dotenv";
import Product from "../models/productModel";
import { type Request, type Response } from "express";
import { put, del } from "@vercel/blob";

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
    const products = await Product.find().populate("seller");
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  try {
    const product = await Product.findOne({ _id: product_id });
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getSellerProducts = async (req: Request, res: Response) => {
  const { seller_id } = req.params;

  try {
    const products = await Product.find({
      seller: seller_id,
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const updateProductDetails = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const { name, price, quantity } = req.body;
  const image = req.file;
  let image_url;

  try {
    // Find existing product
    const product = await Product.findOne({ _id: product_id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If new image uploaded, delete old image first
    if (image) {
      if (product.image_url) {
        await del(product.image_url);
      }

      const { url } = await put(
        `cdn.mern-store/products/${image.originalname}`,
        image.buffer,
        {
          access: "public",
          contentType: image.mimetype,
          allowOverwrite: true,
        }
      );
      image_url = url;
    }

    // Prepare update object with only provided fields
    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (quantity) updateData.quantity = quantity;
    if (image_url) updateData.image_url = image_url;

    // Update only specified fields
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product_id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  try {
    const product = await Product.findOne({ _id: product_id });
    if (!product) {
      return res
        .status(400)
        .json({ error: `Product with id: ${product_id} was not found` });
    }
    const urlToDelete = product.image_url;
    if (urlToDelete) {
      await del(urlToDelete);
    }
    await Product.findOneAndDelete({ _id: product_id });
    res.status(200).json({
      message: `Product with id: ${product_id} has been deleted successfully.`,
    });
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  getSellerProducts,
  updateProductDetails,
  deleteProduct,
};
