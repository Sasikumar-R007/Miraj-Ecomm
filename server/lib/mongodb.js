import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // For development, we'll use a local fallback
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/miraj-candles';

    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.mongoConnected = true;
  } catch (error) {
    console.log('MongoDB connection failed, continuing without database:', error.message);
    global.mongoConnected = false;
    // Don't exit process, allow server to run without DB for development
  }
};