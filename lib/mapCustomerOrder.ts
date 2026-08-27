import type { CartItem, Order, OrderStatus } from "@/types/commerce";
import type {
  CustomerOrder,
  CustomerOrderStatus,
} from "@/types/customer/orders";

const STATUS_MAP: Record<CustomerOrderStatus, OrderStatus> = {
  PAYMENT_PENDING: "pending",
  PLACED: "placed",
  PAID: "paid",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  PAYMENT_FAILED: "cancelled",
  REFUNDED: "refunded",
};

function money(value: number | string) {
  return Number(value) || 0;
}

export function toStoreOrder(order: CustomerOrder): Order {
  const items: CartItem[] = order.items.map((item) => ({
    id: item.productId,
    slug: item.product.slug || item.productId,
    name: item.product.name,
    subtitle: "",
    image: item.product.imageUrls[0] ?? "",
    price: money(item.unitPrice),
    quantity: item.quantity,
  }));

  const history: Order["statusHistory"] = {};
  for (const step of order.timeline ?? []) {
    if (!step.at) continue;
    if (step.key === "PLACED") history.placed = step.at;
    if (step.key === "PAYMENT_CONFIRMED") history.paid = step.at;
    if (step.key === "PROCESSING") history.processing = step.at;
    if (step.key === "SHIPPED") history.shipped = step.at;
    if (step.key === "DELIVERED") history.delivered = step.at;
  }

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    items,
    shippingAddress: {
      name: "",
      email: "",
      phone: "",
      address: order.shippingAddress.line1,
      apartment: order.shippingAddress.apartment ?? undefined,
      country: order.shippingAddress.country ?? "",
      state: order.shippingAddress.state,
      city: order.shippingAddress.city,
      zipCode: order.shippingAddress.zipCode,
    },
    subtotal: money(order.subtotal),
    shipping: money(order.shippingFee),
    tax: money(order.tax),
    total: money(order.total),
    status: STATUS_MAP[order.status] ?? "placed",
    payment: {
      status: "paid",
      method: "card",
      last4: "",
    },
    trackingNumber: order.trackingNumber ?? undefined,
    statusHistory: history,
    createdAt: order.createdAt,
    estimatedDelivery: order.estimatedDelivery ?? order.createdAt,
  };
}

export function orderNumberOf(order: CustomerOrder) {
  return order.orderNumber;
}
