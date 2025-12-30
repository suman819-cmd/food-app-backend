// export type OrderStatus = 
//   | 'PENDING'
//   | 'CONFIRMED'
//   | 'PREPARING'
//   | 'READY'
//   | 'OUT_FOR_DELIVERY'
//   | 'DELIVERED'
//   | 'CANCELLED';

// export type PaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'WALLET';
// export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
// export type DeliveryType = 'DELIVERY' | 'PICKUP' | 'DINE_IN';

// export interface OrderItem {
//   itemId: string;
//   name: string;
//   quantity: number;
//   price: number;
//   total: number;
//   specialInstructions?: string;
// }

// export interface CreateOrderDto {
//   restaurantId: string;
//   items: OrderItem[];
//   deliveryAddress: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     coordinates?: {
//       lat: number;
//       lng: number;
//     };
//   };
//   deliveryType: DeliveryType;
//   paymentMethod: PaymentMethod;
//   notes?: string;
// }

// export interface UpdateOrderStatusDto {
//   orderStatus: OrderStatus;
//   notes?: string;
// }

// export interface AssignDriverDto {
//   driverId: string;
//   driverName: string;
//   driverPhone: string;
//   vehicleNumber?: string;
// }

// export interface UpdateDriverLocationDto {
//   lat: number;
//   lng: number;
// }

// export interface OrderQueryParams {
//   page?: number;
//   limit?: number;
//   status?: OrderStatus;
//   restaurantId?: string;
//   startDate?: Date;
//   endDate?: Date;
// }




















// import { OrderStatus, PaymentMethod, DeliveryType } from "../constants/order.constant";

// export interface OrderItem {
//   itemId: string;
//   name: string;
//   quantity: number;
//   price: number;
//   total?: number;
//   specialInstructions?: string;
// }

// export interface CreateOrderDto {
//   restaurantId: string;
//   items: OrderItem[];
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
// }

// export interface UpdateOrderStatusDto {
//   orderStatus: OrderStatus;
//   notes?: string;
// }














// src/types/order.type.ts

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CASH" | "CARD" | "UPI" | "WALLET";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type DeliveryType = "DELIVERY" | "PICKUP" | "DINE_IN";

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  total?: number;
  specialInstructions?: string;
}

export interface CreateOrderDto {
  restaurantId: string;
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  orderStatus: OrderStatus;
  notes?: string;
}

export interface AssignDriverDto {
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber?: string;
}

export interface UpdateDriverLocationDto {
  lat: number;
  lng: number;
}
