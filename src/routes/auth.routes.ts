// // src/routes/auth.routes.ts
// import { Express } from "express";
// import { signUpController } from "../controllers/auth-controller/signup-controller";
// import { loginController } from "../controllers/auth-controller/login-contoller";
// import { logoutController } from "../controllers/auth-controller/logout-controller";
// import { meController } from "../controllers/auth-controller/me-controller";

// import {
//   sendOtpController,
//   verifyOtpController,
//   resendOtpController,
// } from "../controllers/auth-controller/otp-controller";

// import {
//   requestPasswordResetController,
//   resetPasswordController,
// } from "../controllers/auth-controller/password-reset-controller";

// import { authMiddleware } from "../middleware/auth.middleware";

// export function createAuthRoutes(app: Express) {
//   // -----------------------
//   // AUTH ROUTES
//   // -----------------------
//   app.post("/api/auth/signup", signUpController);          // Uses OTPPurpose.VERIFICATION internally
//   app.post("/api/auth/login", loginController);
//   app.post("/api/auth/logout", authMiddleware, logoutController);
//   app.get("/api/auth/me", authMiddleware, meController);

//   // -----------------------
//   // OTP ROUTES
//   // -----------------------
//   app.post("/api/auth/send-otp", sendOtpController);       // Accepts purpose enum (VERIFICATION / RESET_PASSWORD)
//   app.post("/api/auth/verify-otp", verifyOtpController);   // Accepts purpose enum
//   app.post("/api/auth/resend-otp", resendOtpController);   // Accepts purpose enum

//   // -----------------------
//   // PASSWORD RESET ROUTES
//   // -----------------------
//   app.post("/api/auth/request-password-reset", requestPasswordResetController); // Uses OTPPurpose.RESET_PASSWORD
//   app.post("/api/auth/reset-password", resetPasswordController);                // Uses OTPPurpose.RESET_PASSWORD
// }

import { Express } from "express";
import { signUpController } from "../controllers/auth-controller/signup-controller";
import { loginController } from "../controllers/auth-controller/login-contoller";
import { logoutController } from "../controllers/auth-controller/logout-controller";
import { meController } from "../controllers/auth-controller/me-controller";

import {
  sendOtpController,
  resendOtpController,
  verifyOtpController,
} from "../controllers/auth-controller/otp-controller";

import {
  requestPasswordResetController,
  resetPasswordController,
} from "../controllers/auth-controller/password-reset-controller";

import { authMiddleware } from "../middleware/auth.middleware";

export function createAuthRoutes(app: Express) {
  // AUTH
  app.post("/api/auth/signup", signUpController);
  app.post("/api/auth/login", loginController);
  app.post("/api/auth/logout", authMiddleware, logoutController);
  app.get("/api/auth/me", authMiddleware, meController);

  // OTP
  app.post("/api/auth/send-otp", sendOtpController);
  app.post("/api/auth/verify-otp", verifyOtpController);
  app.post("/api/auth/resend-otp", resendOtpController);

  // Password reset
  app.post("/api/auth/request-password-reset", requestPasswordResetController);
  app.post("/api/auth/reset-password", resetPasswordController);
}
