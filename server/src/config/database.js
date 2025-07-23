import mongoose from "mongoose";
import process from "process";

const connectDB = async () => {
    try {
        if(mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Database connected ✅");
    } catch (error) {
        console.log("MongoDB Database connection failed ❌",error);
        process.exit(1);
    }
}

export default connectDB;