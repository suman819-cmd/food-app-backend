import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { UserModel } from "../../models/User.model";
import { generateToken } from "../../config/jwt";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing required fields" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "User not verified. Please verify OTP." });

    const token = generateToken({ id: user._id.toString(), role: user.role, username: user.username, email: user.email });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
