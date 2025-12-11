// import { Request, Response } from "express";
// import { compare } from "bcryptjs";
// import { UserModel } from "../../models/User.model";
// import { generateToken } from "../../config/jwt";

// export async function loginController(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Missing required fields" });

//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isPasswordValid = await compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

//     if (!user.isVerified) return res.status(403).json({ message: "User not verified. Please verify OTP." });

//     const token = generateToken({ id: user._id.toString(), role: user.role, username: user.username, email: user.email });

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role, isVerified: user.isVerified },
//     });
//   } catch (error: any) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }






// import { Request, Response } from "express";
// import { compare } from "bcryptjs";
// import { UserModel } from "../../models/User.model";
// import { generateToken } from "../../config/jwt";
// import { tokenService } from "../../services/token.service"; // ✅ Import token service

// export async function loginController(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Missing required fields" });

//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isPasswordValid = await compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

//     if (!user.isVerified)
//       return res.status(403).json({ message: "User not verified. Please verify OTP." });

//     const token = generateToken({
//       id: user._id.toString(),
//       role: user.role,
//       username: user.username,
//       email: user.email,
//     });

//     // ✅ Save token in DB
//     await tokenService.createToken({ userId: user._id.toString(), token });

//     // ✅ Set cookie
//     res.cookie("authorization", token, {
//       httpOnly: true,
//       secure: false, // true if HTTPS
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id.toString(),
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }






// import { Request, Response } from "express";
// import { compare } from "bcryptjs";
// import { UserModel, UserRole } from "../../models/User.model";
// import { generateToken } from "../../config/jwt";
// import { tokenService } from "../../services/token.service";

// const OWNER_EMAIL = "shumanbashyal@gmail.com"; // Only this email becomes OWNER

// export async function loginController(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }

//     const isMatch = await compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Wrong password" });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Please verify your email via OTP",
//       });
//     }

//     // ✅ Assign OWNER role only if email matches
//     if (email === OWNER_EMAIL) {
//       if (user.role !== UserRole.ADMIN) {
//         user.role = UserRole.ADMIN; // or UserRole.OWNER if you create it
//         await user.save();
//       }
//     } else {
//       user.role = UserRole.CUSTOMER;
//       await user.save();
//     }

//     const token = generateToken({
//       id: user._id.toString(),
//       email: user.email,
//       username: user.username,
//       role: user.role,
//     });

//     await tokenService.createToken({
//       userId: user._id.toString(),
//       token,
//     });

//     res.cookie("authorization", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role, // 👈 IMPORTANT: frontend uses this
//         isVerified: user.isVerified,
//       },
//     });
//   } catch (err: any) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// }







import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { UserModel, UserRole } from "../../models/User.model";
import { generateToken } from "../../config/jwt";
import { tokenService } from "../../services/token.service";
import { createOTP } from "../../services/otp.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { OTPPurpose } from "../../models/otp.model";

const OWNER_EMAIL = "shumanbashyal@gmail.com"; // Only this email becomes OWNER

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Wrong password" });
    }

    // ---------------------- EMAIL NOT VERIFIED ----------------------
    if (!user.isVerified) {
      // Send OTP automatically
      const otpDoc = await createOTP({ email: user.email, purpose: OTPPurpose.VERIFICATION });
      await sendMailViaAPI(email, "Your OTP", otpMailTemplate(user.username, otpDoc.otp));

      return res.status(403).json({
        success: false,
        message: "Email not verified. OTP has been sent to your email.",
      });
    }

    // ---------------------- ASSIGN ROLES ----------------------
    if (email === OWNER_EMAIL) {
      if (user.role !== UserRole.ADMIN) {
        user.role = UserRole.ADMIN; 
        await user.save();
      }
    } else {
      user.role = UserRole.CUSTOMER;
      await user.save();
    }

    // ---------------------- GENERATE TOKEN ----------------------
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
    });

    await tokenService.createToken({
      userId: user._id.toString(),
      token,
    });

    res.cookie("authorization", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}
















// import { Request, Response } from "express";
// import { compare } from "bcryptjs";
// import { UserModel, UserRole } from "../../models/User.model";
// import { generateToken } from "../../config/jwt";
// import { tokenService } from "../../services/token.service";
// import { createOTP } from "../../services/otp.service";
// import { sendMailViaAPI } from "../../utils/mail/brevoApi";
// import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
// import { OTPPurpose } from "../../models/otp.model";

// const OWNER_EMAIL = "shumanbashyal@gmail.com"; // Admin dashboard email

// export async function loginController(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }

//     const isMatch = await compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Wrong password" });
//     }

//     // ---------------------- EMAIL NOT VERIFIED ----------------------
//     if (!user.isVerified) {
//       // Automatically send OTP
//       const otpDoc = await createOTP({ email: user.email, purpose: OTPPurpose.VERIFICATION });
//       await sendMailViaAPI(email, "Your OTP", otpMailTemplate(user.username, otpDoc.otp));

//       return res.status(403).json({
//         success: false,
//         message: "Email not verified. OTP has been sent to your email.",
//       });
//     }

//     // ---------------------- ASSIGN ROLES ----------------------
//     if (email === OWNER_EMAIL) {
//       user.role = UserRole.ADMIN;
//     } else {
//       user.role = UserRole.CUSTOMER;
//     }
//     await user.save();

//     // ---------------------- GENERATE TOKEN ----------------------
//     const token = generateToken({
//       id: user._id.toString(),
//       email: user.email,
//       username: user.username,
//       role: user.role,
//     });

//     await tokenService.createToken({
//       userId: user._id.toString(),
//       token,
//     });

//     // ---------------------- SEND COOKIE + RESPONSE ----------------------
//     res.cookie("authorization", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//     });

//   } catch (err: any) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// }
