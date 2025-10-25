import Auth from "../models/authModel";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import { put } from "@vercel/blob";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "10d",
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Auth.find();
    return res
      .status(200)
      .json({ ...users, message: "Users returned successfully" });
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await Auth.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: `User with email: ${email} not found` });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password, display_name } = req.body;
  const avatar = req.file;
  let avatar_url;
  try {
    const exists = await Auth.findOne({ email });

    if (exists) {
      if (!exists.account_completed) {
        return res.status(200).json({ user: exists });
      } else {
        throw new Error("Email is already in use");
      }
    }

    const avatarContent = avatar && avatar.buffer;
    if (avatar) {
      const { url } = await put(
        `cdn.mern-store/${avatar?.originalname}`,
        avatarContent as Buffer,
        {
          access: "public",
          contentType: avatar?.mimetype,
          allowOverwrite: true,
        }
      );
      avatar_url = url;
    }

    const user = await Auth.signup(
      email,
      password,
      display_name,
      avatar_url || ""
    );
    const token = createToken(user._id);
    res.status(201).json({ ...user.toObject(), token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const completeAccountCreation = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required" });
  }

  try {
    const updatedUser = await Auth.findOneAndUpdate(
      { email }, // filter
      { role, account_completed: true }, // updates
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Account completed", user: updatedUser.toObject() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existing_user = await Auth.login(email, password);

    if (!existing_user.account_completed) {
      return res
        .status(200)
        .json({ accountIncomplete: true, ...existing_user.toObject() });
    }
    const user = await Auth.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ ...user.toObject(), token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllUsers, getUser, signupUser, completeAccountCreation, loginUser };
