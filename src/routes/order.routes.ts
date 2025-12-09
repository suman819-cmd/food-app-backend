import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { createOrder } from "../controllers/order-controller/create-order.controller";
import { getMyOrders } from "../controllers/order-controller/get-my-orders.controller";
import { updateOrderStatus } from "../controllers/order-controller/update-order-status.controller";

const router = Router();

// User routes
router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);

// Admin / Restaurant routes
router.put("/:orderId/status", authMiddleware, roleMiddleware(["admin", "restaurant"]), updateOrderStatus);

export default router;
