import type { CartItem } from "@/types/commerce";

export const TAX_RATE = 0.08;

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 0;

  const tax = Number((subtotal * TAX_RATE).toFixed(2));

  const total = Number((subtotal + shipping + tax).toFixed(2));

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}

export function generateOrderId() {
  return `AP-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function getEstimatedDelivery() {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  return date.toISOString();
}
