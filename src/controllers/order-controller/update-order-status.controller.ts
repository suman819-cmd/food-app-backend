import { Request, Response } from "express";
import { Order } from "../../models/Order.model";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const allowedStatus = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];
  if (!allowedStatus.includes(status)) return res.status(400).json(ApiResponse.badRequest("Invalid status"));

  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) return res.status(404).json(ApiResponse.notFound("Order not found"));

  return res.status(200).json(ApiResponse.success("Order status updated", order));
});
