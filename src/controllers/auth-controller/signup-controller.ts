import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { UserModel, UserRole } from "../../models/User.model";
import { createOTP } from "../../services/otp.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { generateToken } from "../../config/jwt";
import { OTPPurpose } from "../../models/otp.model"; // ✅ Import enum

export async function signUpController(req: Request, res: Response) {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Missing required fields" });

    const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: "Email or Username already exists" });

    const hashedPassword = await hash(password, 10);
    let assignedRole: UserRole = UserRole.CUSTOMER;
    let isVerified = false;

    if (email.toLowerCase() === "shumanbashyal@gmail.com") assignedRole = UserRole.ADMIN;
    else if (role && Object.values(UserRole).includes(role)) assignedRole = role;

    const user = await UserModel.create({ username, email, password: hashedPassword, role: assignedRole, isVerified });

    // ✅ Use enum value instead of string
    const otpDoc = await createOTP({ email, purpose: OTPPurpose.VERIFICATION });
    console.log("Signup OTP:", otpDoc.otp);

    try {
      await sendMailViaAPI(email, "Verify Your Account", otpMailTemplate(username, otpDoc.otp));
    } catch (err) {
      console.error("Error sending OTP email:", err);
    }

    const token = generateToken({ id: user._id.toString(), role: user.role, username: user.username, email: user.email });

    res.status(201).json({
      message: "Signup successful. OTP sent to email.",
      token,
      user: { id: user._id.toString(), username, email, role: assignedRole, isVerified },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
