import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const PORT = process.env.PORT;
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

export default connectDB;
