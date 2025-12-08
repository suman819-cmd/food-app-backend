// src/controllers/auth-controller/logout-controller.ts
import { Request, Response, NextFunction } from "express";
import { tokenService } from "../../services/token.service";

export async function logoutController(
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authorization?.replace("Bearer ", "");
    const userId = req.user?.id;

    res.clearCookie("authorization");

    if (token && userId) {
      await tokenService.deleteToken({ userId, token });
    }

    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
}
