import {
  placeOrder,
  getBuyerOrders,
  getSingleOrder,
  cancelOrder,
  getSellerOrders,
} from "../controllers/orderControllers";
import express, { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Buyer and Seller order management
 */

/**
 * @swagger
 * /api/orders/place-order:
 *   post:
 *     summary: Place a new order
 *     description: Allows a buyer to place an order for one or more products.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyer
 *               - products
 *               - shipping_address
 *             properties:
 *               buyer:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - seller
 *                     - price
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                     seller:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               shipping_address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       500:
 *         description: Server error
 */
router.post("/place-order", express.json(), placeOrder);

/**
 * @swagger
 * /api/orders/user/{buyerId}:
 *   get:
 *     summary: Get all orders of a buyer
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get("/user/:buyerId", getBuyerOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get single order details
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", getSingleOrder);

/**
 * @swagger
 * /api/orders/cancel/{orderId}/{productId}:
 *   patch:
 *     summary: Cancel a product in an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product cancelled successfully
 *       403:
 *         description: Cannot cancel shipped/completed product
 *       404:
 *         description: Order or product not found
 */
router.patch("/cancel/:orderId/:productId", cancelOrder);

/**
 * @swagger
 * /api/orders/seller/{sellerId}:
 *   get:
 *     summary: Get all orders containing a seller's products
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders containing seller's products
 */
router.get("/seller/:sellerId", getSellerOrders);

export default router;
