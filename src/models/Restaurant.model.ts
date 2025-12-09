import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  description: string;
  cuisine: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  isActive: boolean;
  owner: mongoose.Types.ObjectId;
  rating: number;
  deliveryRadius: number;
  estimatedDeliveryTime: {
    min: number;
    max: number;
  };
  image?: string; // ✅ Add image field
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  description: { type: String },
  cuisine: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  openingHours: {
    type: Map,
    of: {
      open: String,
      close: String
    },
    default: {}
  },
  isActive: { type: Boolean, default: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  deliveryRadius: { type: Number, default: 5 },
  estimatedDeliveryTime: {
    min: { type: Number, default: 30 },
    max: { type: Number, default: 60 }
  },
  image: { type: String, default: "" } // ✅ Add default image field
}, {
  timestamps: true
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
