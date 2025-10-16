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

businessSchema.statics.createBusiness = async function (
  name,
  address,
  merchant_email,
  thumbnail,
  logo_url,
  description,
  phone
) {
  if (!name || !address || description || !phone)
    throw Error("All fields must be filled.");
};
