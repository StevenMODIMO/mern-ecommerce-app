import mongoose from "mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { isStrongPassword, isEmail } from "validator";

const userSchema = new mongoose.Schema({
  display_name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["buyer", "seller", "merchant"],
    default: "buyer",
  },
  cart: [
    {
      from: String,
      imagePath: String,
      product_name: String,
      description: String,
      price: Number,
      currency: String,
      quantity: Number,
    },
  ],
});

userSchema.statics.signup = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!isStrongPassword(password)) {
    throw Error(
      "Password must contain upper and lowercase letters, numbers and special characters"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User exists");
  }

  const salt = await genSalt(10);
  const hashed = await hash(password, salt);

  const user = await this.create({ email, password: hashed });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

export default mongoose.model("Auth", userSchema);
