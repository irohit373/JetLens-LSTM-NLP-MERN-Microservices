import mongoose from 'mongoose';

const connectDB = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);

  }
}

export default connectDB;