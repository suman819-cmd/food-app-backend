// import mongoose from "mongoose";

// export async function connectMongoDb() {
//   const uri = process.env.MONGO_DB_URI;
//   if (!uri) {
//     console.error("MONGO_DB_URI is not defined!");
//     process.exit(1);
//   }

//   try {
//     await mongoose.connect(uri, { dbName: "movie-review-app" });
//     console.log("MongoDB connected ✅");
//   } catch (error) {
//     console.error("Failed to connect MongoDB", error);
//     process.exit(1);
//   }
// }








import mongoose from "mongoose";
import { config } from "./environment";

export async function connectMongoDb() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}
