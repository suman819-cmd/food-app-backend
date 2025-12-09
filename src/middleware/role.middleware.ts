// import { NextFunction, Request, Response } from "express";
// import { TPayload } from "../types/payload.type";

// export const roleMiddleware =
//   (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user as TPayload;
//     if (!user || !roles.includes(user.role)) {
//       res.status(403).json({ message: "Forbidden: Insufficient role" });
//       return;
//     }
//     next();
//   };





import { NextFunction, Request, Response } from "express";
import { TPayload } from "../types/payload.type";

export const roleMiddleware =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as TPayload;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Convert both user role and allowed roles to lowercase for comparison
    const userRole = user.role.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
