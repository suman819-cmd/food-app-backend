import { Request, Response } from "express";
import { Order } from "../../models/Order.model";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id; // ✅ non-null assertion
  const { items, deliveryAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json(ApiResponse.badRequest("Order items are required"));
  }

  const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    items,
    deliveryAddress,
    totalAmount,
  });

  return res.status(201).json(ApiResponse.created("Order created successfully", order));
});
