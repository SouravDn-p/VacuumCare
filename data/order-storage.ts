import type { Order } from "@/types/commerce";

const ORDER_KEY = "elite-orders";

export function saveOrder(order: Order) {
  const existing = getOrders();

  const updated = [order, ...existing];

  localStorage.setItem(ORDER_KEY, JSON.stringify(updated));
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const orders = localStorage.getItem(ORDER_KEY);

    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
}

export function getOrder(orderId: string) {
  return getOrders().find((order) => order.id === orderId);
}
