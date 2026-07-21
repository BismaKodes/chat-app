import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

// server.js
app.get("/", (req, res) => {
  res.send("Chat server is running 🚀")
})

// auth
import register from "./routes/auth.routes.js"
import Message from "./models/message.model.js";
app.use("/api/auth", register)


// Message
import messageRoutes from "./routes/message.routes.js";
import { userRouter } from "./routes/user.routes.js";
app.use("/api/users", userRouter)
app.use("/api/messages", messageRoutes);

export default app