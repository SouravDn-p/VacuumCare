export interface CartItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;

  address: string;
  apartment?: string;

  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export type OrderStatus =
  | "placed"
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderStatusHistory {
  pending?: string;
  placed?: string;
  paid?: string;
  processing?: string;
  shipped?: string;
  delivered?: string;
  cancelled?: string;
  refunded?: string;
}

export interface Order {
  id: string;
  orderNumber?: string;

  items: CartItem[];

  shippingAddress: ShippingAddress;

  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  status: OrderStatus;

  payment: {
    status: "paid";
    method: "card";
    last4: string;
  };

  trackingNumber?: string;

  statusHistory?: OrderStatusHistory;

  createdAt: string;
  estimatedDelivery: string;
}
