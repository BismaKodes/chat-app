import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
        // console.log("MONGO_URI:", process.env.MONGO_URI)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

export default connectDb
