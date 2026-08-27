export type CustomerOrderGroup = "all" | "active" | "complete";

export type CustomerOrderStatus =
  | "PAYMENT_PENDING"
  | "PLACED"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "PAYMENT_FAILED"
  | "REFUNDED";

export interface CustomerOrderListQuery {
  group?: CustomerOrderGroup;
  status?: CustomerOrderStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CustomerOrderProduct {
  id: string;
  name: string;
  imageUrls: string[];
  slug: string | null;
}

export interface CustomerOrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number | string;
  product: CustomerOrderProduct;
}

export interface CustomerOrderShippingAddress {
  line1: string;
  apartment?: string | null;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface CustomerOrderTimelineStep {
  key: string;
  label: string;
  completed: boolean;
  current: boolean;
  at: string | null;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  status: CustomerOrderStatus;
  subtotal: number | string;
  tax: number | string;
  shippingFee: number | string;
  total: number | string;
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDelivery: string | null;
  paidAt: string | null;
  paymentStatus: string | null;
  shippingAddress: CustomerOrderShippingAddress;
  timeline: CustomerOrderTimelineStep[];
  canCancel: boolean;
  canReturn: boolean;
  items: CustomerOrderItem[];
  createdAt: string;
}

export interface CustomerOrderPage {
  items: CustomerOrder[];
  total: number;
  page: number;
  pageSize: number;
}
