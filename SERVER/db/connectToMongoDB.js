import mongoose, { connect } from "mongoose";

const connectMongoDb = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};
export default connectMongoDb;
