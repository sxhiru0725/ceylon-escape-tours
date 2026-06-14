import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return {
      connected: false,
      message: "MONGODB_URI is missing from backend/.env",
    };
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");
    return { connected: true, message: "Connected to MongoDB" };
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return { connected: false, message: error.message };
  }
}

export function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
