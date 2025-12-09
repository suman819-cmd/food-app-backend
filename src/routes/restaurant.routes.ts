// import { Router } from "express";
// import { authMiddleware } from "../middleware/auth.middleware";
// import { roleMiddleware } from "../middleware/role.middleware";
// import { createRestaurant } from "../controllers/restaurant-controller/create-restaurant.controller";
// import { getRestaurants } from "../controllers/restaurant-controller/get-restaurants.controller";
// import { updateRestaurant } from "../controllers/restaurant-controller/update-restaurant.controller"; // ✅ ADD THIS

// const router = Router();

// // Public → Anyone can see restaurants
// router.get("/", getRestaurants);

// // Admin → Create restaurant
// router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createRestaurant);

// // ✅ Admin → Update restaurant
// router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), updateRestaurant);

// export default router;







import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { createRestaurant } from "../controllers/restaurant-controller/create-restaurant.controller";
import { getRestaurants } from "../controllers/restaurant-controller/get-restaurants.controller";
import { updateRestaurant } from "../controllers/restaurant-controller/update-restaurant.controller";
import { upload } from "../middleware/upload.middleware"; // ✅ Multer middleware

const router = Router();

// Public → Anyone can see restaurants
router.get("/", getRestaurants);

// Admin → Create restaurant with image upload
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("image"), // ✅ Handle single image file
  createRestaurant
);

// Admin → Update restaurant with optional image upload
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("image"), // ✅ Optional image for update
  updateRestaurant
);

export default router;
