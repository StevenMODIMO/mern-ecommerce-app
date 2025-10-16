import mongoose, { Model, Document } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { isStrongPassword, isEmail } from "validator";

// interface ICartItem {
//   from?: string;
//   imagePath?: string;
//   product_name?: string;
//   description?: string;
//   price?: number;
//   currency?: string;
//   quantity?: number;
// }

interface IUser extends Document {
  display_name?: string;
  email: string;
  password: string;
  avatar: string;
  role: "buyer" | "seller" | "merchant";
  //cart: ICartItem[];
}

interface IUserModel extends Model<IUser> {
  signup(
    display_name: string,
    email: string,
    password: string,
    role: string
  ): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new mongoose.Schema<IUser>({
  display_name: String,
  email: String,
  password: String,
  // avatar: String,
  // role: {
  //   type: String,
  //   enum: ["buyer", "seller", "merchant"],
  //   default: "buyer",
  // },
  // cart: [
  //   {
  //     from: String,
  //     imagePath: String,
  //     product_name: String,
  //     description: String,
  //     price: Number,
  //     currency: String,
  //     quantity: Number,
  //   },
  // ],
});

userSchema.statics.signup = async function (
  email: string,
  password: string,
  display_name: string
  //role: string
) {
  if (!email || !password) throw Error("All fields must be filled");
  if (!isEmail(email)) throw Error("Invalid Email");
  if (!isStrongPassword(password))
    throw Error(
      "Password must contain upper and lowercase letters, numbers and special characters"
    );

  const exists = await this.findOne({ email });
  if (exists) throw Error("User exists");

  const salt = await genSalt(10);
  const hashed = await hash(password, salt);

  const user = await this.create({
    email,
    password: hashed,
    display_name,
    //role,
  });
  return user;
};

userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) throw Error("All fields must be filled");

  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  const match = await compare(password, user.password);
  if (!match) throw Error("Incorrect Password");

  return user;
};

export default mongoose.model<IUser, IUserModel>("Auth", userSchema);
