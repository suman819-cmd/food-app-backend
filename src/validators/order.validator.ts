// import { z, ZodError } from "zod";
// import { ORDER_STATUS_LIST, PAYMENT_METHOD_LIST, DELIVERY_TYPE_LIST } from "../constants/order.constant";
// import { Request, Response, NextFunction } from "express";
// import ApiResponse from "../utils/apiResponse";

// // =======================
// // CREATE ORDER SCHEMA
// // =======================
// export const createOrderSchema = z.object({
//   restaurantId: z.string().min(1, "Restaurant ID is required"),
//   items: z
//     .array(
//       z.object({
//         itemId: z.string().min(1, "Item ID is required"),
//         name: z.string().min(1, "Item name is required"),
//         quantity: z.number().min(1, "Quantity must be at least 1"),
//         price: z.number().min(0, "Price must be 0 or more"),
//         total: z.number().optional(),
//         specialInstructions: z.string().optional(),
//       })
//     )
//     .min(1, "At least one item is required"),
//   deliveryAddress: z.object({
//     street: z.string().min(1, "Street is required"),
//     city: z.string().min(1, "City is required"),
//     state: z.string().min(1, "State is required"),
//     zipCode: z.string().min(1, "Zip code is required"),
//     coordinates: z
//       .object({
//         lat: z.number(),
//         lng: z.number(),
//       })
//       .optional(),
//   }),
//   deliveryType: z.enum(DELIVERY_TYPE_LIST),
//   paymentMethod: z.enum(PAYMENT_METHOD_LIST),
//   notes: z.string().optional(),
// });

// // =======================
// // UPDATE ORDER STATUS SCHEMA
// // =======================
// export const updateOrderStatusSchema = z.object({
//   orderStatus: z.enum(ORDER_STATUS_LIST),
//   notes: z.string().optional(),
// });

// // =======================
// // VALIDATOR MIDDLEWARE
// // =======================

// // Validate Create Order
// export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
//   const result = createOrderSchema.safeParse(req.body);

//   if (!result.success) {
//     const error = result.error as ZodError;
//     const message = error.issues.length > 0 ? error.issues[0].message : "Invalid request body";
//     return res.status(400).json(ApiResponse.badRequest(message));
//   }

//   req.body = result.data;
//   next();
// };

// // Validate Update Order Status
// export const validateUpdateOrderStatus = (req: Request, res: Response, next: NextFunction) => {
//   const result = updateOrderStatusSchema.safeParse(req.body);

//   if (!result.success) {
//     const error = result.error as ZodError;
//     const message = error.issues.length > 0 ? error.issues[0].message : "Invalid request body";
//     return res.status(400).json(ApiResponse.badRequest(message));
//   }

//   req.body = result.data;
//   next();
// };








import { z } from "zod";
import { ORDER_STATUS_LIST, PAYMENT_METHOD_LIST, DELIVERY_TYPE_LIST } from "../constants/order.constant";
import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/apiResponse";

// =======================
// CREATE ORDER SCHEMA
// =======================
export const createOrderSchema = z.object({
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  items: z.array(
    z.object({
      itemId: z.string().min(1, "Item ID is required"),
      name: z.string().min(1, "Item name is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      price: z.number().min(0, "Price must be 0 or more"),
      total: z.number().optional(),
      specialInstructions: z.string().optional(),
    })
  ).min(1, "At least one item is required"),
  deliveryAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  }),
  deliveryType: z.enum(DELIVERY_TYPE_LIST),
  paymentMethod: z.enum(PAYMENT_METHOD_LIST),
  notes: z.string().optional(),
});

// =======================
// UPDATE ORDER STATUS SCHEMA
// =======================
export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(ORDER_STATUS_LIST),
  notes: z.string().optional(),
});

// =======================
// CREATE ORDER VALIDATOR
// =======================
export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
  const result = createOrderSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Validation failed"; // ✅ use issues
    return res.status(400).json(ApiResponse.badRequest(firstError));
  }

  req.body = result.data;
  next();
};

// =======================
// UPDATE ORDER STATUS VALIDATOR
// =======================
export const validateUpdateOrderStatus = (req: Request, res: Response, next: NextFunction) => {
  const result = updateOrderStatusSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Validation failed"; // ✅ use issues
    return res.status(400).json(ApiResponse.badRequest(firstError));
  }

  req.body = result.data;
  next();
};
