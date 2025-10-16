require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import appRoutes from "./routes/appRoutes";
import path from "path";
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

app.get("/images/:filename", async (req, res) => {
  const imagePath = path.join(__dirname, "images", req.params.filename);
  res.sendFile(imagePath);
});
app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});
