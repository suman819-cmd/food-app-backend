import mongoose from "mongoose";

export enum OTPPurpose {
  VERIFICATION = "VERIFICATION",
  SIGNUP = "SIGNUP",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export interface IOTP extends mongoose.Document {
  email: string;
  otp: string;
  purpose: OTPPurpose;
  expiresAt: Date;
  attempts: number;
}

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    purpose: { type: String, enum: Object.values(OTPPurpose), default: OTPPurpose.VERIFICATION },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const OTPModel = mongoose.model<IOTP>("OTP", otpSchema);
