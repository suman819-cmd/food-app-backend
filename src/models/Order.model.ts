// import { Schema, model, Types, Document } from "mongoose";

// export interface IOrder extends Document {
//   user: Types.ObjectId;
//   items: {
//     foodId: string;
//     name: string;
//     quantity: number;
//     price: number;
//   }[];
//   totalAmount: number;
//   deliveryAddress: string;
//   status: string;
// }

// const orderSchema = new Schema<IOrder>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     items: [
//       {
//         foodId: { type: String, required: true },
//         name: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     deliveryAddress: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export const Order = model<IOrder>("Order", orderSchema);





















// // src/models/Order.model.ts
// import { Schema, model, Types, Document } from "mongoose";
// import { OrderStatus, PaymentMethod, DeliveryType } from "../constants/order.constant";

// export interface IOrder extends Document {
//   user: Types.ObjectId;
//   restaurantId: Types.ObjectId;
//   items: {
//     itemId: string;
//     name: string;
//     quantity: number;
//     price: number;
//     total?: number;
//     specialInstructions?: string;
//   }[];
//   totalAmount: number;
//   deliveryAddress: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     coordinates?: { lat: number; lng: number };
//   };
//   deliveryType: DeliveryType;
//   paymentMethod: PaymentMethod;
//   notes?: string;
//   status: OrderStatus;
// }

// const orderSchema = new Schema<IOrder>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
//     items: [
//       {
//         itemId: { type: String, required: true },
//         name: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//         total: { type: Number },
//         specialInstructions: { type: String },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     deliveryAddress: {
//       street: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       zipCode: { type: String, required: true },
//       coordinates: {
//         lat: { type: Number },
//         lng: { type: Number },
//       },
//     },
//     deliveryType: { type: String, enum: ["DELIVERY","PICKUP","DINE_IN"], required: true },
//     paymentMethod: { type: String, enum: ["CASH","CARD","UPI","WALLET"], required: true },
//     notes: { type: String },
//     status: { type: String, enum: ["PENDING","CONFIRMED","PREPARING","READY","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"], default: "PENDING" },
//   },
//   { timestamps: true }
// );

// export const Order = model<IOrder>("Order", orderSchema);









// src/models/Order.model.ts
import { Schema, model, Types, Document } from "mongoose";
import { OrderStatus, PaymentMethod, PaymentStatus, DeliveryType, OrderItem } from "../types/order.type";

export interface IOrder extends Document {
  user: Types.ObjectId;
  restaurantId: Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  driver?: {
    driverId: string;
    driverName: string;
    driverPhone: string;
    vehicleNumber?: string;
    location?: { lat: number; lng: number };
  };
  notes?: string;
  orderHistory: { status: OrderStatus; notes?: string; updatedAt: Date }[];
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number },
        specialInstructions: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      coordinates: { lat: Number, lng: Number },
    },
    deliveryType: { type: String, enum: ["DELIVERY","PICKUP","DINE_IN"], required: true },
    paymentMethod: { type: String, enum: ["CASH","CARD","UPI","WALLET"], required: true },
    paymentStatus: { type: String, enum: ["PENDING","PAID","FAILED","REFUNDED"], default: "PENDING" },
    status: { type: String, enum: ["PENDING","CONFIRMED","PREPARING","READY","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"], default: "PENDING" },
    driver: {
      driverId: String,
      driverName: String,
      driverPhone: String,
      vehicleNumber: String,
      location: { lat: Number, lng: Number },
    },
    notes: String,
    orderHistory: [{ status: { type: String }, notes: String, updatedAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
