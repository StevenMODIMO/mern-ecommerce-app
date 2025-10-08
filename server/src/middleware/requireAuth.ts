require("dotenv").config();
import jwt from "jsonwebtoken";
import User from "../models/authModel";
import { NextFunction, type Request, type Response } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
