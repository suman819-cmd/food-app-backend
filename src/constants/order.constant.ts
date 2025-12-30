export const ORDER_STATUS_LIST = ["PENDING","CONFIRMED","PREPARING","READY","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"] as const;
export const PAYMENT_METHOD_LIST = ["CASH","CARD","UPI","WALLET"] as const;
export const DELIVERY_TYPE_LIST = ["DELIVERY","PICKUP","DINE_IN"] as const;

export type OrderStatus = typeof ORDER_STATUS_LIST[number];
export type PaymentMethod = typeof PAYMENT_METHOD_LIST[number];
export type DeliveryType = typeof DELIVERY_TYPE_LIST[number];
