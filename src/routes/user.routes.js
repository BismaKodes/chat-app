import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/", verifyJWT, getAllUsers)
userRouter.get("/:id", verifyJWT, getUserById)

export { userRouter }