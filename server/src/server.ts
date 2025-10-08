require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes")
const path = require("path")

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("MERN Ecommerce")
})

app.get("/images/:filename", async (req, res) => {
  const imagePath = path.join(__dirname, "images", req.params.filename)
  res.sendFile(imagePath)
})
app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});
