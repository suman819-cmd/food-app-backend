// import { Request, Response } from "express";
// import asyncHandler from "../../utils/asyncHandler";
// import ApiResponse from "../../utils/apiResponse";
// import { Order } from "../../models/Order.model";
// import { CreateOrderDto } from "../../types/order.type";

// export const createOrder = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user!.id;
//   const payload: CreateOrderDto = req.body;

//   const totalAmount = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const order = await Order.create({
//     user: userId,
//     restaurantId: payload.restaurantId,
//     items: payload.items,
//     deliveryAddress: payload.deliveryAddress,
//     totalAmount,
//     deliveryType: payload.deliveryType,
//     paymentMethod: payload.paymentMethod,
//     notes: payload.notes,
//     status: "PENDING",
//   });

//   return res.status(201).json(ApiResponse.created("Order created successfully", order));
// });

// export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user!.id;
//   const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
//   return res.status(200).json(ApiResponse.success("Orders fetched successfully", orders));
// });

// export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const { orderStatus } = req.body;

//   const allowedStatus = ["PENDING","CONFIRMED","PREPARING","READY","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"];
//   if (!allowedStatus.includes(orderStatus)) return res.status(400).json(ApiResponse.badRequest("Invalid order status"));

//   const order = await Order.findByIdAndUpdate(orderId, { status: orderStatus }, { new: true });
//   if (!order) return res.status(404).json(ApiResponse.notFound("Order not found"));

//   return res.status(200).json(ApiResponse.success("Order status updated", order));
// });














// src/controllers/order-controller/order.controller.ts
import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { OrderService } from "../../services/order/order.service";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderService.createOrder(req.user!.id, req.body);
  return res.status(201).json(ApiResponse.success("Order created successfully", order));
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await OrderService.getUserOrders(req.user!.id);
  return res.status(200).json(ApiResponse.success("Orders fetched successfully", orders));
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderService.updateOrderStatus(req.params.orderId, req.body);
  return res.status(200).json(ApiResponse.success("Order status updated", order));
});

export const assignDriver = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderService.assignDriver(req.params.orderId, req.body);
  return res.status(200).json(ApiResponse.success("Driver assigned", order));
});

export const updateDriverLocation = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderService.updateDriverLocation(req.params.orderId, req.body);
  return res.status(200).json(ApiResponse.success("Driver location updated", order));
});
