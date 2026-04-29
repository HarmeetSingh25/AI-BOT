import mongoose from "mongoose";
import env from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
