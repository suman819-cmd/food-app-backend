import { Request, Response } from "express";
import { createOTP, verifyOtp } from "../../services/otp.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { userMongoService } from "../../services/authUser.service";
import { OTPPurpose } from "../../models/otp.model";
import bcrypt from "bcryptjs";

/** Request password reset OTP */
export async function requestPasswordResetController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await userMongoService.getUserByEmail({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpDoc = await createOTP({ email, purpose: OTPPurpose.RESET_PASSWORD });
    console.log("Password reset OTP:", otpDoc.otp);

    await sendMailViaAPI(email, "Reset Your Password", otpMailTemplate(user.username || "User", otpDoc.otp));

    res.status(200).json({ message: "Password reset OTP sent to email" });
  } catch (err) {
    console.error("Password reset request error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/** Reset password */
export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: "Email, OTP, and new password are required" });

    const verify = await verifyOtp(email, otp, OTPPurpose.RESET_PASSWORD);
    if (!verify.ok) return res.status(400).json({ message: verify.reason });

    const user = await userMongoService.getUserByEmail({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
