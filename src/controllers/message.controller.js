import mongoose from "mongoose";
import Message from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async(req, res) => {
  const sender = req.user.id;
  const receiver = req.params.id;
  const { message } = req.body;

  if(!message){
    return res.status(400).json({message: "message is required"})
  }
  if(!sender){
    return res.status(401).json({message: "Unauthorized: sender missing"});
  }

  await Message.create({sender, receiver, message})
  return res.status(200).json({message: "message sent"})

})

export const getMessages = asyncHandler(async(req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.id;

  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId }
    ]
  }).sort({ createdAt: 1 });

  return res.status(200).json(messages)
})