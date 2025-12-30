// import { Request, Response } from "express";
// import { Order } from "../../models/Order.model";
// import asyncHandler from "../../utils/asyncHandler";
// import ApiResponse from "../../utils/apiResponse";

// export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user!.id;
//   const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
//   return res.status(200).json(ApiResponse.success("Orders fetched successfully", orders));
// });













import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { Order } from "../../models/Order.model";

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  return res.status(200).json(ApiResponse.success("Orders fetched successfully", orders));
});
