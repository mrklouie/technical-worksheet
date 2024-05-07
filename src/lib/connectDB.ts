import mongoose from "mongoose";

export const connectDB = async () => {
  let connections: { isConnected?: number } = {};
  try {
    if (connections.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO_URI);
    connections.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    throw new Error(error.message || error);
  }
};
