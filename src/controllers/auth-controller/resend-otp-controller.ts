import { Request, Response } from "express";
import { createOTP } from "../../services/otp.service";
import { userMongoService } from "../../services/authUser.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { OTPPurpose } from "../../models/otp.model";

export async function resendOtpController(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userMongoService.getUserByEmail({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // generate NEW OTP
    const otpDoc = await createOTP({
      email,
      purpose: OTPPurpose.VERIFICATION,
      expireMinutes: 10,
    });

    console.log("Resend OTP:", otpDoc.otp);

    // send email
    await sendMailViaAPI(
      email,
      "Your New OTP Code",
      otpMailTemplate(user.username, otpDoc.otp)
    );

    res.status(200).json({
      message: "A new OTP has been sent to your email.",
    });

  } catch (error: any) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
