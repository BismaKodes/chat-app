import mongoose from "mongoose";
import User from "../models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async(req, res) => {
  const users = await User.find().select("-password -refreshToken");
  return res.status(200).json(users);
})

export const getUserById = asyncHandler(async(req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
});