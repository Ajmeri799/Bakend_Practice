// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// const connectDB = async () => {
//   try {
//     // const ss = await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`);
//     const ss = await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`);
//     console.log(`hii connect ${ss.connection.host}`);
//   } catch (error) {
//     console.log("Mongodb error", error);
//     process.exit(1);
//   }
// };
// export default connectDB;
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const ss = await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`);
    console.log(`Connected to MongoDB: ${ss.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
