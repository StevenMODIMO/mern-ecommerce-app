require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productsRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishListRoutes from "./routes/wishListRoutes";
import orderRoutes from "./routes/orderRoutes";
import { setupSwagger } from "./swagger";

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

setupSwagger(app);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});
