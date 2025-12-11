// import { Request, Response } from "express";
// import { hash } from "bcryptjs";
// import { UserModel, UserRole } from "../../models/User.model";
// import { createOTP } from "../../services/otp.service";
// import { sendMailViaAPI } from "../../utils/mail/brevoApi";
// import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
// import { generateToken } from "../../config/jwt";
// import { OTPPurpose } from "../../models/otp.model"; // ✅ Import enum

// export async function signUpController(req: Request, res: Response) {
//   try {
//     const { username, email, password, role } = req.body;
//     if (!username || !email || !password) return res.status(400).json({ message: "Missing required fields" });

//     const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
//     if (userExists) return res.status(400).json({ message: "Email or Username already exists" });

//     const hashedPassword = await hash(password, 10);
//     let assignedRole: UserRole = UserRole.CUSTOMER;
//     let isVerified = false;

//     if (email.toLowerCase() === "shumanbashyal@gmail.com") assignedRole = UserRole.ADMIN;
//     else if (role && Object.values(UserRole).includes(role)) assignedRole = role;

//     const user = await UserModel.create({ username, email, password: hashedPassword, role: assignedRole, isVerified });

//     // ✅ Use enum value instead of string
//     const otpDoc = await createOTP({ email, purpose: OTPPurpose.VERIFICATION });
//     console.log("Signup OTP:", otpDoc.otp);

//     try {
//       await sendMailViaAPI(email, "Verify Your Account", otpMailTemplate(username, otpDoc.otp));
//     } catch (err) {
//       console.error("Error sending OTP email:", err);
//     }

//     const token = generateToken({ id: user._id.toString(), role: user.role, username: user.username, email: user.email });

//     res.status(201).json({
//       message: "Signup successful. OTP sent to email.",
//       token,
//       user: { id: user._id.toString(), username, email, role: assignedRole, isVerified },
//     });
//   } catch (error: any) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }















// import { Request, Response } from "express";
// import { hash } from "bcryptjs";
// import { UserModel, UserRole } from "../../models/User.model";
// import { createOTP } from "../../services/otp.service";
// import { sendMailViaAPI } from "../../utils/mail/brevoApi";
// import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
// import { generateToken } from "../../config/jwt";
// import { OTPPurpose } from "../../models/otp.model";
// import { tokenService } from "../../services/token.service";

// export async function signUpController(req: Request, res: Response) {
//   try {
//     const { username, email, password, role } = req.body;
//     if (!username || !email || !password) return res.status(400).json({ message: "Missing required fields" });

//     const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
//     if (userExists) return res.status(400).json({ message: "Email or Username already exists" });

//     const hashedPassword = await hash(password, 10);
//     let assignedRole: UserRole = UserRole.CUSTOMER;
//     let isVerified = false;

//     if (email.toLowerCase() === "shumanbashyal@gmail.com") assignedRole = UserRole.ADMIN;
//     else if (role && Object.values(UserRole).includes(role)) assignedRole = role;

//     const user = await UserModel.create({ username, email, password: hashedPassword, role: assignedRole, isVerified });

//     const otpDoc = await createOTP({ email, purpose: OTPPurpose.VERIFICATION });
//     console.log("Signup OTP:", otpDoc.otp);

//     try {
//       await sendMailViaAPI(email, "Verify Your Account", otpMailTemplate(username, otpDoc.otp));
//     } catch (err) {
//       console.error("Error sending OTP email:", err);
//     }

//     const token = generateToken({ id: user._id.toString(), role: user.role, username: user.username, email: user.email });

//     // ✅ Save token
//     await tokenService.createToken({ userId: user._id.toString(), token });

//     // ✅ Set cookie
//     res.cookie("authorization", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       message: "Signup successful. OTP sent to email.",
//       user: { id: user._id.toString(), username, email, role: assignedRole, isVerified },
//     });
//   } catch (error: any) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }








// import { Request, Response, NextFunction } from "express";
// import bcrypt from "bcryptjs";
// import { UserModel, UserRole } from "../../models/User.model";
// import { FoodAppError } from "../../error";

// interface SignupBody {
//   username: string;    // frontend sends this
//   email: string;
//   password: string;
// }

// export const signUpController = async (
//   req: Request<{}, {}, SignupBody>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate required fields
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ─────────────────────────────────────────────
//     // SPECIAL RULE: AUTO-ADMIN (owner email)
//     // ─────────────────────────────────────────────
//     const isOwnerEmail = email === "shumanbashyal@gmail.com";

//     // Create user
//     const newUser = await UserModel.create({
//       username,
//       email,
//       password: hashedPassword,
//       role: isOwnerEmail ? UserRole.ADMIN : UserRole.CUSTOMER,
//       isVerified: false,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         username: newUser.username,
//         role: newUser.role,
//       },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     next(new FoodAppError("Signup failed", 500));
//   }
// };




















import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserModel, UserRole } from "../../models/User.model";
import { FoodAppError } from "../../error";
import { createOTP } from "../../services/otp.service";
import { sendMailViaAPI } from "../../utils/mail/brevoApi";
import { otpMailTemplate } from "../../utils/mail/templates/otpMail";
import { OTPPurpose } from "../../models/otp.model";

interface SignupBody {
  username: string;
  email: string;
  password: string;
  restaurantName?: string;
  phone?: string;
}

export const signUpController = async (
  req: Request<{}, {}, SignupBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, restaurantName, phone } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isOwnerEmail = email === "shumanbashyal@gmail.com";

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: isOwnerEmail ? UserRole.ADMIN : UserRole.CUSTOMER,
      isVerified: false,
      restaurantName,
      phone,
    });

    // ------------------------------------------
    // ✅ SEND OTP ON SIGNUP
    // ------------------------------------------
    const otpDoc = await createOTP({
      email,
      purpose: OTPPurpose.VERIFICATION,
    });

    await sendMailViaAPI(
      email,
      "Your OTP Verification Code",
      otpMailTemplate(username, otpDoc.otp)
    );

    console.log("OTP created & sent:", otpDoc.otp);

    return res.status(201).json({
      success: true,
      message: "User created successfully. OTP sent.",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      requiresVerification: true,
    });

  } catch (error) {
    console.error("Signup error:", error);
    next(new FoodAppError("Signup failed", 500));
  }
};

















