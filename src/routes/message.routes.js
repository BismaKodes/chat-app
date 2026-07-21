import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // if you have auth

const router = express.Router();

// send message to a specific user
router.post("/:id", verifyJWT, sendMessage);

// get all messages between logged-in user and another user
router.get("/:id", verifyJWT, getMessages);

export default router;