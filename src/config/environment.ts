// import dotenv from 'dotenv';

// dotenv.config();

// export const env = {
//   // Server Configuration
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   PORT: process.env.PORT || 5000,
//   API_PREFIX: process.env.API_PREFIX || '/api/v1',
  
//   // Database Configuration
//   MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/foodapp',
  
//   // JWT Configuration
//   JWT_SECRET: process.env.JWT_SECRET || 'default-secret-key',
//   JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
//   JWT_COOKIE_EXPIRE: parseInt(process.env.JWT_COOKIE_EXPIRE || '7', 10),
  
//   // Security
//   CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
//   // Rate Limiting
//   RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
//   RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
// };








import dotenv from "dotenv";
dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_DB_URI || "",
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret",
    expire: process.env.JWT_EXPIRE || "7d",
    cookieExpire: Number(process.env.JWT_COOKIE_EXPIRE) || 7, // in days
  },
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY || "",
    senderEmail: process.env.SENDER_EMAIL || "",
  },
  otp: {
    expireMinutes: Number(process.env.OTP_EXPIRE_MINUTES) || 10,
  },
};
