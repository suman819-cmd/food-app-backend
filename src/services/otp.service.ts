// import crypto from "crypto";
// import { OTPModel, OTPPurpose } from "../models/otp.model";

// const DEFAULT_OTP_LENGTH = 6;

// function generateNumericOtp(length = DEFAULT_OTP_LENGTH) {
//   const digits = "0123456789";
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += digits[crypto.randomInt(0, digits.length)];
//   }
//   return otp;
// }

// export async function createOTP(options: { email: string; purpose?: OTPPurpose; expireMinutes?: number; length?: number }) {
//   const { email, purpose = OTPPurpose.VERIFICATION, expireMinutes = 10, length } = options;

//   // ✅ Delete only expired OTPs for this email & purpose
//   await OTPModel.deleteMany({ email, purpose, expiresAt: { $lt: new Date() } });

//   const otp = generateNumericOtp(length);
//   const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);

//   // ✅ Save OTP as string
//   return OTPModel.create({ email, otp: otp.toString(), purpose, expiresAt, attempts: 0 });
// }

// export async function verifyOtp(email: string, otpInput: string, purpose: OTPPurpose = OTPPurpose.VERIFICATION) {
//   // ✅ Find latest OTP by creation date
//   const doc = await OTPModel.findOne({ email, purpose }).sort({ createdAt: -1 });
//   if (!doc) return { ok: false, reason: "OTP not found or expired" };

//   // ✅ Check expiry
//   if (doc.expiresAt.getTime() < Date.now()) {
//     await OTPModel.deleteOne({ _id: doc._id }); // clean expired OTP
//     return { ok: false, reason: "OTP expired" };
//   }

//   // ✅ Check attempts
//   if (doc.attempts >= 5) return { ok: false, reason: "Too many attempts" };

//   // ✅ Check OTP match
//   if (doc.otp !== otpInput) {
//     doc.attempts += 1;
//     await doc.save();
//     return { ok: false, reason: "Invalid OTP" };
//   }

//   // ✅ OTP verified, delete it
//   await OTPModel.deleteOne({ _id: doc._id });
//   return { ok: true };
// }
















// import crypto from "crypto";
// import { OTPModel, OTPPurpose } from "../models/otp.model";
// import { config } from "../config/environment";

// const DEFAULT_OTP_LENGTH = 6;

// function generateNumericOtp(length = DEFAULT_OTP_LENGTH) {
//   const digits = "0123456789";
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += digits[crypto.randomInt(0, digits.length)];
//   }
//   return otp;
// }

// export async function createOTP(options: { email: string; purpose?: OTPPurpose; expireMinutes?: number; length?: number }) {
//   const { email, purpose = OTPPurpose.VERIFICATION, expireMinutes = config.otp.expireMinutes, length } = options;

//   await OTPModel.deleteMany({ email, purpose, expiresAt: { $lt: new Date() } });

//   const otp = generateNumericOtp(length);
//   const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);

//   return OTPModel.create({ email, otp: otp.toString(), purpose, expiresAt, attempts: 0 });
// }

// export async function verifyOtp(email: string, otpInput: string, purpose: OTPPurpose = OTPPurpose.VERIFICATION) {
//   const doc = await OTPModel.findOne({ email, purpose }).sort({ createdAt: -1 });
//   if (!doc) return { ok: false, reason: "OTP not found or expired" };
//   if (doc.expiresAt.getTime() < Date.now()) {
//     await OTPModel.deleteOne({ _id: doc._id });
//     return { ok: false, reason: "OTP expired" };
//   }
//   if (doc.attempts >= 5) return { ok: false, reason: "Too many attempts" };
//   if (doc.otp !== otpInput) {
//     doc.attempts += 1;
//     await doc.save();
//     return { ok: false, reason: "Invalid OTP" };
//   }
//   await OTPModel.deleteOne({ _id: doc._id });
//   return { ok: true };
// }




















import crypto from "crypto";
import { OTPModel, OTPPurpose } from "../models/otp.model";
import { config } from "../config/environment";

const DEFAULT_OTP_LENGTH = 6;
const MAX_ATTEMPTS = 5;

function generateNumericOtp(length = DEFAULT_OTP_LENGTH) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  return otp;
}

// Create OTP
export async function createOTP(options: { email: string; purpose?: OTPPurpose; expireMinutes?: number; length?: number }) {
  const { email, purpose = OTPPurpose.VERIFICATION, expireMinutes = config.otp.expireMinutes, length } = options;

  // Delete expired OTPs for this email/purpose
  await OTPModel.deleteMany({ email, purpose, expiresAt: { $lt: new Date() } });

  const otp = generateNumericOtp(length);
  const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);

  const otpDoc = await OTPModel.create({
    email,
    otp,
    purpose,
    expiresAt,
    attempts: 0,
  });

  console.log(`Generated OTP for ${email} (${purpose}):`, otpDoc.otp);
  return otpDoc;
}

// Verify OTP
export async function verifyOtp(email: string, otpInput: string, purpose: OTPPurpose = OTPPurpose.VERIFICATION) {
  const doc = await OTPModel.findOne({ email, purpose }).sort({ createdAt: -1 });
  if (!doc) return { ok: false, reason: "OTP not found or expired" };

  console.log("Verifying OTP for", email, "input:", otpInput, "stored:", doc.otp);

  if (doc.expiresAt.getTime() < Date.now()) {
    await OTPModel.deleteOne({ _id: doc._id });
    return { ok: false, reason: "OTP expired" };
  }

  if (doc.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "Too many attempts" };

  if (doc.otp !== otpInput) {
    doc.attempts += 1;
    await doc.save();
    return { ok: false, reason: "Invalid OTP" };
  }

  // ✅ Successful verification, delete all OTPs for this email/purpose
  await OTPModel.deleteMany({ email, purpose });
  return { ok: true };
}
