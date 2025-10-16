import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: String,
  address: String,
  merchant_email: String,
  thumbnail: String,
  logo_url: String,
  description: String,
  phone: String,
});
