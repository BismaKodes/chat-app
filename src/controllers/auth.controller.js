import mongoose from "mongoose";
import User from "../models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export const register = asyncHandler(async(req, res) => {
  const { email, password, username } = req.body
  if(!email){
    return res.status(400).json({message: "email is required"})
  }
  if(!password){
    return res.status(400).json({message: "password is required"})
  }
  if(!username){
    return res.status(400).json({message: "username is required"})
  }
  const exist = await User.findOne({email})
  if(exist){
    return res
    .status(400)
    .json({message: "user already exists"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await User.create({email, password: hashedPassword, username})
  return res.status(200).json({message: "user created"})
})

export const login = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if(!user){
    res.status(401).json({message: "user not found"})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return res.status(400).json({message: "password incorrect"})
  }
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // savig refresh token inside user document in database
  user.refreshToken = refreshToken;
  // actually savves updated user data in database
  await user.save();

  // refresh token in cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true
  })
  res.cookie("accessToken", accessToken, {
    httpOnly: true
  })

 return res.status(200).json({
    accessToken,
    user: {
        _id: user._id,
        username: user.username,
        email: user.email
    }
});
})

export const refresh = asyncHandler(async(req, res) => {
 
  const token = req.cookies.refreshToken
  if(!token){
    return res.status(400).json({message: "invalid credentials"})
  }
  
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN)
  const user = await User.findById(decoded.id)

  if(!user || user.refreshToken !== token){
    return res.status(400).json({message: "invalideds credentials"})
  }

  const newAccessToken = generateAccessToken(user)
   res.cookie("accessToken", newAccessToken, {
    httpOnly: true
  })
   return res.json(true)
})

export const logout = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
  req.user._id,
  {
    $unset: {
      refreshToken: 1
    }
  },
  {
    new: true
  }
)

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .status(200)
  .json(true)
})