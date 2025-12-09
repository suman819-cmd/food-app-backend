// // src/middleware/auth.middleware.ts
// import { NextFunction, Request, Response } from "express";
// import { verify } from "jsonwebtoken";
// import { tokenService } from "../services/token.service";

// export async function authMiddleware(req: Request & { user?: any }, res: Response, next: NextFunction) {
//   try {
//     const tokenHeader = req.headers.authorization || req.cookies?.authorization;
//     if (!tokenHeader)
//       return res.status(401).json({ message: "Authorization token not provided" });

//     const token = tokenHeader.replace("Bearer ", "");
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) throw new Error("JWT_SECRET not defined");

//     const payload = verify(token, jwtSecret) as {
//       id: string;
//       email: string;
//       username: string;
//       role: string;
//     };

//     const tokenInDb = await tokenService.getToken({ token });
//     if (!tokenInDb)
//       return res.status(401).json({ message: "Token not found. You are logged out!" });

//     req.user = payload;
//     next();
//   } catch (error: any) {
//     if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
//     if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid token" });
//     next(error);
//   }
// }





import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { tokenService } from "../services/token.service";

interface JwtPayload {
  id: string;
  role: string;
  email: string;
  username: string;
}

export async function authMiddleware(
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.authorization;
    if (!token) return res.status(401).json({ message: "Authorization token not provided" });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not defined");

    const payload = verify(token, jwtSecret) as JwtPayload;

    const tokenInDb = await tokenService.getToken({ token });
    if (!tokenInDb) return res.status(401).json({ message: "Token not found. You are logged out!" });

    req.user = payload;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
    if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid token" });
    next(error);
  }
}
