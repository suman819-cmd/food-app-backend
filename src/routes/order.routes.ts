// import { Router } from "express";
// import { authMiddleware } from "../middleware/auth.middleware";
// import { roleMiddleware } from "../middleware/role.middleware";
// import { createOrder } from "../controllers/order-controller/create-order.controller";
// import { getMyOrders } from "../controllers/order-controller/get-my-orders.controller";
// import { updateOrderStatus } from "../controllers/order-controller/update-order-status.controller";

// const router = Router();

// // User routes
// router.post("/", authMiddleware, createOrder);
// router.get("/my-orders", authMiddleware, getMyOrders);

// // Admin / Restaurant routes
// router.put("/:orderId/status", authMiddleware, roleMiddleware(["admin", "restaurant"]), updateOrderStatus);

// export default router;














// import { Router } from "express";
// import { authMiddleware } from "../middleware/auth.middleware";
// import { roleMiddleware } from "../middleware/role.middleware";
// import { createOrder, getMyOrders, updateOrderStatus } from "../controllers/order-controller/order.controller";
// import { validateCreateOrder, validateUpdateOrderStatus } from "../validators/order.validator";

// const router = Router();

// // User routes
// router.post("/", authMiddleware, validateCreateOrder, createOrder);
// router.get("/my-orders", authMiddleware, getMyOrders);

// // Admin / Restaurant routes
// router.put("/:orderId/status", authMiddleware, roleMiddleware(["admin","restaurant"]), validateUpdateOrderStatus, updateOrderStatus);

// export default router;















// src/routes/order.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  assignDriver,
  updateDriverLocation,
} from "../controllers/order-controller/order.controller";
import { validateCreateOrder, validateUpdateOrderStatus } from "../validators/order.validator";

const router = Router();

// User
router.post("/", authMiddleware, validateCreateOrder, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);

// Admin / Restaurant
router.put("/:orderId/status", authMiddleware, roleMiddleware(["admin","restaurant"]), validateUpdateOrderStatus, updateOrderStatus);
router.post("/:orderId/assign-driver", authMiddleware, roleMiddleware(["admin","restaurant"]), assignDriver);
router.put("/:orderId/driver-location", authMiddleware, roleMiddleware(["delivery"]), updateDriverLocation);

export default router;
