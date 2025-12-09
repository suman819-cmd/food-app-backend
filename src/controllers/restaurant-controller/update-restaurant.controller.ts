import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { Restaurant } from "../../models/Restaurant.model";
import ApiResponse from "../../utils/apiResponse";

export const updateRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(ApiResponse.unauthorized());
  }

  const restaurantId = req.params.id;
  const { name, description, address, contact, openingHours, deliveryRadius, estimatedDeliveryTime } = req.body;

  // Find the restaurant by ID
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return res.status(404).json(ApiResponse.notFound("Restaurant not found"));
  }

  // Check if current user is the owner
  if (restaurant.owner.toString() !== user.id) {
    return res.status(403).json(ApiResponse.forbidden("You are not allowed to update this restaurant"));
  }

  // Update fields if provided
  if (name) restaurant.name = name;
  if (description) restaurant.description = description;
  if (address) restaurant.address = address;
  if (contact) restaurant.contact = contact;
  if (openingHours) restaurant.openingHours = openingHours;
  if (deliveryRadius) restaurant.deliveryRadius = deliveryRadius;
  if (estimatedDeliveryTime) restaurant.estimatedDeliveryTime = estimatedDeliveryTime;

  // Handle image upload
  if (req.file) {
    restaurant.image = `/uploads/${req.file.filename}`; // Save image path
  }

  await restaurant.save();

  return res.status(200).json(ApiResponse.success("Restaurant updated successfully", restaurant));
});
