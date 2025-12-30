// import { Order } from "../../models/Order.model";
// import { ORDER_STATUS_LIST, OrderStatus } from "../../constants/order.constant";
// import { CreateOrderDto } from "../../types/order.type";

// export class OrderService {
//   static calculateTotal(items: CreateOrderDto["items"]): number {
//     return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   }

//   static async createOrder(userId: string, payload: CreateOrderDto) {
//     const totalAmount = this.calculateTotal(payload.items);

//     return Order.create({
//       user: userId,
//       items: payload.items,
//       deliveryAddress: payload.deliveryAddress,
//       totalAmount,
//       status: "PENDING",
//       deliveryType: payload.deliveryType,
//       paymentMethod: payload.paymentMethod,
//       notes: payload.notes,
//     });
//   }

//   static async getUserOrders(userId: string) {
//     return Order.find({ user: userId }).sort({ createdAt: -1 });
//   }

//   static async updateStatus(orderId: string, status: OrderStatus) {
//     if (!ORDER_STATUS_LIST.includes(status)) {
//       throw new Error("INVALID_ORDER_STATUS");
//     }

//     const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//     if (!order) throw new Error("ORDER_NOT_FOUND");
//     return order;
//   }
// }








// src/services/order/order.service.ts
import { Order } from "../../models/Order.model";
import { CreateOrderDto, UpdateOrderStatusDto, AssignDriverDto, UpdateDriverLocationDto } from "../../types/order.type";

export class OrderService {
  static async createOrder(userId: string, dto: CreateOrderDto) {
    const totalAmount = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: userId,
      restaurantId: dto.restaurantId,
      items: dto.items,
      totalAmount,
      deliveryAddress: dto.deliveryAddress,
      deliveryType: dto.deliveryType,
      paymentMethod: dto.paymentMethod,
      orderHistory: [{ status: "PENDING", notes: "Order created", updatedAt: new Date() }],
    });

    return order;
  }

  static async getUserOrders(userId: string) {
    return Order.find({ user: userId }).sort({ createdAt: -1 });
  }

  static async getOrderById(orderId: string) {
    return Order.findById(orderId);
  }

  static async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("ORDER_NOT_FOUND");

    order.status = dto.orderStatus;
    order.orderHistory.push({ status: dto.orderStatus, notes: dto.notes, updatedAt: new Date() });
    await order.save();
    return order;
  }

  static async assignDriver(orderId: string, dto: AssignDriverDto) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("ORDER_NOT_FOUND");

    order.driver = { ...dto };
    order.status = "OUT_FOR_DELIVERY";
    order.orderHistory.push({ status: "OUT_FOR_DELIVERY", notes: `Driver ${dto.driverName} assigned`, updatedAt: new Date() });
    await order.save();
    return order;
  }

  static async updateDriverLocation(orderId: string, dto: UpdateDriverLocationDto) {
    const order = await Order.findById(orderId);
    if (!order || !order.driver) throw new Error("DRIVER_NOT_ASSIGNED");

    order.driver.location = dto;
    await order.save();
    return order;
  }
}

