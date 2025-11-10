import { type Request, type Response } from "express";
import Orders from "../models/ordersModel";
import Cart from "../models/cartModel";

// ----------------- BUYER CONTROLLERS -----------------

// Place a new order
const placeOrder = async (req: Request, res: Response) => {
  try {
    const { buyer, products, shipping_address } = req.body;

    const total_amount = products.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const newOrder = await Orders.create({
      buyer,
      products,
      total_amount,
      shipping_address,
      payment_status: "pending",
    });

    const productIds = products.map((p: any) => p.product);
    await Cart.deleteMany({
      buyer_id: buyer,
      product_id: { $in: productIds },
    });

    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders of a buyer
const getBuyerOrders = async (req: Request, res: Response) => {
  try {
    const { buyerId } = req.params;
    const orders = await Orders.find({ buyer: buyerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order details
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Orders.findOne({ _id: orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel an order (only pending products)
const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, productId } = req.params;

    // 1️⃣ Find the order containing this product
    const order = await Orders.findOne({
      _id: orderId,
      "products.product": productId,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 2️⃣ Find the specific product within the order
    const productInOrder = order.products.find(
      (p: any) => p.product.toString() === productId
    );

    // 3️⃣ If already cancelled, stop here
    if (productInOrder?.order_status === "cancelled") {
      return res.status(400).json({
        error: "This order has already been cancelled.",
      });
    }

    if (productInOrder?.order_status === "completed") {
      return res.status(400).json({
        error: "This order has already been cancelled.",
      });
    }

    // 4️⃣ Proceed to cancel only if it’s not shipped or completed
    const updatedOrder = await Orders.findOneAndUpdate(
      {
        _id: orderId,
        "products.product": productId,
        "products.order_status": { $nin: ["shipped", "completed"] },
      },
      {
        $set: { "products.$.order_status": "cancelled" },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        error: "Order or cancellable product not found",
      });
    }

    res.status(200).json({
      message: "Product cancelled successfully",
      order: updatedOrder,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ----------------- SELLER CONTROLLERS -----------------

// Get all orders containing seller's products
const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const orders = await Orders.find({ "products.seller": sellerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, productId } = req.params;
    const { newStatus } = req.body;

    const validStatuses = ["pending", "processing", "shipped"];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Orders.findOne({
      _id: orderId,
      "products.product": productId,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 2️⃣ Find the specific product within the order
    const productInOrder = order.products.find(
      (p: any) => p.product.toString() === productId
    );

    // 3️⃣ If already cancelled, stop here
    if (productInOrder?.order_status === "cancelled") {
      return res.status(400).json({
        error: "This order has already been cancelled.",
      });
    }

    if (productInOrder?.order_status === "completed") {
      return res.status(400).json({
        error: "This order has already been completed.",
      });
    }

    const updatedOrder = await Orders.findOneAndUpdate(
      {
        _id: orderId,
        "products.product": productId,
      },
      {
        $set: { "products.$.order_status": newStatus },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order or product not found" });
    }

    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  placeOrder,
  getBuyerOrders,
  getSingleOrder,
  cancelOrder,
  getSellerOrders,
  updateOrderStatus,
};
