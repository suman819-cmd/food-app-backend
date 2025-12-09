import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { Restaurant } from "../../models/Restaurant.model";
import ApiResponse from "../../utils/apiResponse";

export const getRestaurants = asyncHandler(async (req: Request, res: Response) => {
  const restaurants = await Restaurant.find().sort({ createdAt: -1 });
  return res.status(200).json(ApiResponse.success("Restaurants fetched", restaurants));
});
