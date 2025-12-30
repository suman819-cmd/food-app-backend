// import { Request, Response } from "express";
// import { Order } from "../../models/Order.model";
// import asyncHandler from "../../utils/asyncHandler";
// import ApiResponse from "../../utils/apiResponse";

// export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const { status } = req.body;

//   const allowedStatus = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];
//   if (!allowedStatus.includes(status)) return res.status(400).json(ApiResponse.badRequest("Invalid status"));

//   const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//   if (!order) return res.status(404).json(ApiResponse.notFound("Order not found"));

//   return res.status(200).json(ApiResponse.success("Order status updated", order));
// });








// import { Request, Response } from "express";
// import asyncHandler from "../../utils/asyncHandler";
// import ApiResponse from "../../utils/apiResponse";
// import { OrderService } from "../../services/order/order.service";

// export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const { status } = req.body;

//   try {
//     const order = await OrderService.updateStatus(orderId, status);
//     return res
//       .status(200)
//       .json(ApiResponse.success("Order status updated", order));
//   } catch (error: any) {
//     if (error.message === "INVALID_ORDER_STATUS") {
//       return res
//         .status(400)
//         .json(ApiResponse.badRequest("Invalid order status"));
//     }
//     if (error.message === "ORDER_NOT_FOUND") {
//       return res
//         .status(404)
//         .json(ApiResponse.notFound("Order not found"));
//     }
//     throw error;
//   }
// });












import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { Order } from "../../models/Order.model";

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { orderStatus, notes } = req.body;

  const allowedStatus = ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
  if (!allowedStatus.includes(orderStatus)) {
    return res.status(400).json(ApiResponse.badRequest("Invalid order status"));
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: orderStatus, notes },
    { new: true }
  );

  if (!order) return res.status(404).json(ApiResponse.notFound("Order not found"));

  return res.status(200).json(ApiResponse.success("Order status updated", order));
});
