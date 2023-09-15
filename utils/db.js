import mongoose from "mongoose";

let isConnected = false; //to track the connection

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;

    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
};
