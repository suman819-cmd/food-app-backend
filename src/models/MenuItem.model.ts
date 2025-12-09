import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  cuisine: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  preparationTime: number; // in minutes
  restaurant: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  isVegetarian: { type: Boolean, default: false },
  isSpicy: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String },
  preparationTime: { type: Number, default: 15 },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, {
  timestamps: true
});

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);