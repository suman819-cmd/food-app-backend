import { Request, Response, NextFunction } from "express";
import { OTPModel, OTPPurpose } from "../../models/otp.model";
import { UserModel } from "../../models/User.model";

export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // ✅ Get the latest OTP
    const record = await OTPModel.findOne({
      email,
      purpose: OTPPurpose.VERIFICATION,
    }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // ✅ Check expiry
    if (record.expiresAt.getTime() < Date.now()) {
      await OTPModel.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ Compare OTP as plain text (no bcrypt, because you store plain OTP)
    if (record.otp !== otp) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Verify user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    // ✅ Delete OTP after verification
    await OTPModel.deleteMany({ email, purpose: OTPPurpose.VERIFICATION });

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("OTP verification error:", err);
    next(err);
  }
};




















// import { Request, Response } from "express";
// import { verifyOtp } from "../../services/otp.service";
// import { userMongoService } from "../../services/authUser.service";
// import { OTPPurpose } from "../../models/otp.model";

// export async function verifyOtpController(req: Request, res: Response) {
//   try {
//     const { email, otp, purpose = OTPPurpose.VERIFICATION } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ success: false, message: "Email and OTP required" });
//     }

//     // Verify OTP from DB
//     const result = await verifyOtp(email, otp, purpose);

//     if (!result.ok) {
//       return res.status(400).json({ success: false, message: result.reason });
//     }

//     // Mark user as verified if not already
//     const user = await userMongoService.getUserByEmail({ email });
//     if (user && !user.isVerified && (purpose === OTPPurpose.VERIFICATION || purpose === OTPPurpose.SIGNUP)) {
//       user.isVerified = true;
//       await user.save();
//     }

//     return res.status(200).json({ success: true, message: "OTP verified successfully" });

//   } catch (err: any) {
//     console.error("verifyOtpController error:", err);
//     res.status(500).json({ success: false, message: "Failed to verify OTP", error: err.message });
//   }
// }
