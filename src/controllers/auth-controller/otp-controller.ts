// import { Request, Response, NextFunction } from "express";
// import { createOTP, verifyOtp } from "../../services/otp.service";
// import { sendMailViaAPI } from "../../utils/mail/brevoApi";
// import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
// import { userMongoService } from "../../services/authUser.service";
// import { OTPPurpose } from "../../models/otp.model";

// /** Send OTP */
// export async function sendOtpController(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, purpose = OTPPurpose.VERIFICATION } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otpDoc = await createOTP({ email, purpose });
//     const user = await userMongoService.getUserByEmail({ email });
//     await sendMailViaAPI(email, "Your OTP", otpMailTemplate(user?.username || "User", otpDoc.otp));

//     console.log(`OTP sent to ${email}:`, otpDoc.otp);
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("sendOtpController error:", err);
//     next(err);
//   }
// }

// /** Verify OTP */
// export async function verifyOtpController(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, otp, purpose = OTPPurpose.VERIFICATION } = req.body;
//     if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

//     const result = await verifyOtp(email, otp, purpose);
//     if (!result.ok) return res.status(400).json({ message: result.reason });

//     if (purpose === OTPPurpose.SIGNUP || purpose === OTPPurpose.VERIFICATION) {
//       const user = await userMongoService.getUserByEmail({ email });
//       if (user && !user.isVerified) {
//         user.isVerified = true;
//         await user.save();
//       }
//     }

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (err) {
//     console.error("verifyOtpController error:", err);
//     next(err);
//   }
// }

// /** Resend OTP */
// export async function resendOtpController(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, purpose = OTPPurpose.VERIFICATION } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otpDoc = await createOTP({ email, purpose });
//     const user = await userMongoService.getUserByEmail({ email });
//     await sendMailViaAPI(email, "Your Resent OTP", otpMailTemplate(user?.username || "User", otpDoc.otp));

//     console.log(`Resent OTP to ${email}:`, otpDoc.otp);
//     res.status(200).json({ message: "OTP resent successfully" });
//   } catch (err) {
//     console.error("resendOtpController error:", err);
//     next(err);
//   }
// }

import { Request, Response } from "express";
import { createOTP, verifyOtp } from "../../services/otp.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { userMongoService } from "../../services/authUser.service";
import { OTPPurpose } from "../../models/otp.model";

/** Send OTP */
export async function sendOtpController(req: Request, res: Response) {
  try {
    const { email, purpose = OTPPurpose.VERIFICATION } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await userMongoService.getUserByEmail({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpDoc = await createOTP({ email, purpose });

    await sendMailViaAPI(
      email,
      purpose === OTPPurpose.VERIFICATION
        ? "Your OTP Verification Code"
        : "Your OTP",
      otpMailTemplate(user.username || "User", otpDoc.otp)
    );

    console.log(`✅ OTP sent to ${email}:`, otpDoc.otp);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully" });
  } catch (err: any) {
    console.error("sendOtpController error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: err.message,
    });
  }
}

/** Verify OTP */
export async function verifyOtpController(req: Request, res: Response) {
  try {
    console.log("verifyOtpController req body:", req.body);
    const { email, otp, purpose = OTPPurpose.VERIFICATION } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });

    const user = await userMongoService.getUserByEmail({ email });
    console.log("user search", user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.isVerified) {
      return res
        .status(200)
        .json({ success: true, message: "OTP already verified", user });
    }

    const result = await verifyOtp(email, otp, purpose);
    if (!result.ok) {
      return res.status(400).json({ success: false, message: result.reason });
    }

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully", user });
  } catch (err: any) {
    console.error("verifyOtpController error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: err.message,
    });
  }
}

/** Resend OTP */
export async function resendOtpController(req: Request, res: Response) {
  try {
    const { email, purpose = OTPPurpose.VERIFICATION } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const user = await userMongoService.getUserByEmail({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otpDoc = await createOTP({ email, purpose });

    await sendMailViaAPI(
      email,
      "Your Resent OTP",
      otpMailTemplate(user.username || "User", otpDoc.otp)
    );

    console.log(`✅ Resent OTP to ${email}:`, otpDoc.otp);

    return res
      .status(200)
      .json({ success: true, message: "OTP resent successfully" });
  } catch (err: any) {
    console.error("resendOtpController error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: err.message,
    });
  }
}
