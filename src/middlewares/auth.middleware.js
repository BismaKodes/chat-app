import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyJWT = asyncHandler(async(req, res, next) => {
  //  get token from header
 try {
   const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
   
 
    if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
    
 
   // verify it
   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
 
   // attach user to request
   req.user = decoded
   next()
 } catch (error) {
  return res.status(401).json({ message: "Invalid or expired token" });
 }
})