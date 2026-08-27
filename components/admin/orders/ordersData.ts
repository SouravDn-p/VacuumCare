export type OrderTab =
  | "Pending"
  | "Paid"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded"
  | "COD orders";

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export interface OrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: string;
  payment: string;
  isCod: boolean;
  status: OrderStatus;
  nextStatus?: string;
}

export const ORDER_TABS: OrderTab[] = [
  "Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
  "COD orders",
];

export const ORDERS_LIST: OrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "CC-3086",
    customer: "Amelia Roberts",
    date: "July 31, 2026",
    total: "$67.12",
    payment: "COD",
    isCod: true,
    status: "Pending",
  },
  {
    id: "ord-2",
    orderNumber: "CC-3086",
    customer: "Amelia Roberts",
    date: "July 31, 2026",
    total: "$167.12",
    payment: "Paid via Stripe",
    isCod: false,
    status: "Processing",
  },
  {
    id: "ord-3",
    orderNumber: "CC-3086",
    customer: "Amelia Roberts",
    date: "July 31, 2026",
    total: "$167.12",
    payment: "Paid via Stripe",
    isCod: false,
    status: "Shipped",
  },
  {
    id: "ord-4",
    orderNumber: "CC-3087",
    customer: "David Chen",
    date: "July 30, 2026",
    total: "$249.50",
    payment: "Paid via Stripe",
    isCod: false,
    status: "Paid",
  },
  {
    id: "ord-5",
    orderNumber: "CC-3088",
    customer: "Sarah Thompson",
    date: "July 29, 2026",
    total: "$349.00",
    payment: "Paid via Stripe",
    isCod: false,
    status: "Delivered",
  },
  {
    id: "ord-6",
    orderNumber: "CC-3089",
    customer: "John Miller",
    date: "July 28, 2026",
    total: "$120.00",
    payment: "COD",
    isCod: true,
    status: "Cancelled",
  },
  {
    id: "ord-7",
    orderNumber: "CC-3090",
    customer: "Emma Watson",
    date: "July 27, 2026",
    total: "$85.00",
    payment: "Paid via Stripe",
    isCod: false,
    status: "Refunded",
  },
];
