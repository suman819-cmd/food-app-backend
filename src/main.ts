// import express, { Request, Response, NextFunction } from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// import { connectMongoDb } from "./config/database";
// import { FoodAppError } from "./error";
// import { createAuthRoutes } from "./routes/auth.routes";

// const app = express();
// const PORT = Number(process.env.PORT) || 5000;

// // Connect to MongoDB
// connectMongoDb()
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     app.listen(PORT, () => {
//       console.log(`Server started at http://localhost:${PORT} 🚀`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB, exiting...", error);
//     process.exit(1);
//   });

// // CORS Setup
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:4200"],
//     credentials: true,
//   })
// );

// app.options("*", cors());

// // Middleware
// app.use(cookieParser());
// app.use(express.json());

// // Routes
// createAuthRoutes(app);

// // Global Error Handler
// app.use(
//   (error: FoodAppError, req: Request, res: Response, next: NextFunction) => {
//     console.error("App error: ", error);
//     res.status(error.status || 500).json({
//       message: error.message || "Internal Server Error",
//       meta: error.meta || null,
//     });
//   }
// );

// // Default Route
// app.use((req: Request, res: Response) => {
//   res.status(404).json({ message: "Route not found" });
// });






// import express, { Request, Response, NextFunction } from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// import { connectMongoDb } from "./config/database";
// import { FoodAppError } from "./error";

// // Routes
// import { createAuthRoutes } from "./routes/auth.routes";
// import orderRoutes from "./routes/order.routes";
// import restaurantRoutes from "./routes/restaurant.routes"; // ✅ ADD THIS

// const app = express();
// const PORT = Number(process.env.PORT) || 5000;

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:4200"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());

// // Routes
// createAuthRoutes(app);
// app.use("/api/orders", orderRoutes);
// app.use("/api/restaurants", restaurantRoutes); // ✅ REGISTER RESTAURANT ROUTES

// // MongoDB connection
// connectMongoDb()
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT} 🚀`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err);
//     process.exit(1);
//   });

// // Global Error Handler
// app.use((err: FoodAppError, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   res.status(err.status || 500).json({
//     message: err.message || "Internal server error",
//     meta: err.meta || null,
//   });
// });

// // 404 Route
// app.use((req: Request, res: Response) => {
//   res.status(404).json({ message: "Route not found" });
// });










import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectMongoDb } from "./config/database";
import { FoodAppError } from "./error";

// Routes
import { createAuthRoutes } from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import restaurantRoutes from "./routes/restaurant.routes";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200", "http://localhost:8080"], // ✅ added 8080
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
createAuthRoutes(app);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);

// MongoDB connection
connectMongoDb()
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// Global Error Handler
app.use((err: FoodAppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    meta: err.meta || null,
  });
});

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
