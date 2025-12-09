import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { Restaurant } from "../../models/Restaurant.model";
import ApiResponse from "../../utils/apiResponse";

export const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(ApiResponse.unauthorized());
  }

  const { name, description, address, contact } = req.body;

  if (!name) {
    return res.status(400).json(ApiResponse.badRequest("Restaurant name is required"));
  }

  // Parse address and contact if they are strings (because of form-data)
  const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
  const parsedContact = typeof contact === "string" ? JSON.parse(contact) : contact;

  const restaurant = await Restaurant.create({
    name,
    description,
    owner: user.id, // auto owner
    contact: parsedContact || {
      email: user.email,
      phone: "9800000000"
    },
    address: parsedAddress,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  return res.status(201).json(ApiResponse.created("Restaurant created", restaurant));
});
