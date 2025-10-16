import Auth from "../models/authModel";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password, display_name, role } = req.body;
  try {
    const user = await Auth.signup(email, password, display_name, role);
    const token = createToken(user._id);
    const user_role = user.role;
    res.status(200).json({ email, token, user_role });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const token = createToken(user._id);
    const role = user.role;
    const name = user.display_name;
    res.status(200).json({ email, token, role, name });
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

export { signupUser, loginUser };
