import type { CartItem } from "@/types/commerce";

export interface ServerCartProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrls: string[];
  slug: string | null;
  tagline: string | null;
  inStock: boolean;
  taxable: boolean;
}

export interface ServerCartItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product: ServerCartProduct;
}

export interface ServerCart {
  id: string;
  customerId: string;
  items: ServerCartItem[];
  itemCount: number;
  currency: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  taxRate: number;
}

export interface CheckoutPreviewItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  taxable: boolean;
  inStock: boolean;
  availableStock: number;
  tagline: string | null;
  imageUrls: string[];
}

export interface CheckoutPreviewAddress {
  id: string;
  line1: string;
  apartment: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface CheckoutPreview {
  source: "cart" | "items";
  items: CheckoutPreviewItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  taxRate: number;
  currency: string;
  shippingAddress: CheckoutPreviewAddress | null;
}

export interface CheckoutSession {
  paymentId: string;
  orderId: string;
  checkoutSessionId: string;
  checkoutUrl: string;
  currency: string;
  amount: number;
}

export interface CheckoutLineItem {
  productId: string;
  quantity: number;
}

export const CART_IMAGE_FALLBACK = "/images/web-logo.png";

export function mapServerCartItems(cart: ServerCart | undefined): CartItem[] {
  if (!cart) return [];
  return cart.items.map((item) => ({
    id: item.productId,
    slug: item.product.slug || item.productId,
    name: item.product.name,
    subtitle: item.product.tagline || "",
    image: item.product.imageUrls[0] || CART_IMAGE_FALLBACK,
    price: item.unitPrice,
    quantity: item.quantity,
  }));
}

/** Mutates a cached cart so quantity (and totals) update before the API returns. */
export function applyServerCartQuantity(
  cart: ServerCart,
  productId: string,
  quantity: number,
) {
  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.productId !== productId);
  } else {
    const item = cart.items.find((entry) => entry.productId === productId);
    if (!item) return;
    item.quantity = quantity;
    item.lineTotal = Number((item.unitPrice * quantity).toFixed(2));
  }

  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = Number(
    cart.items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2),
  );
  const taxableSubtotal = cart.items.reduce(
    (sum, item) => sum + (item.product.taxable ? item.lineTotal : 0),
    0,
  );
  cart.tax = Number((taxableSubtotal * cart.taxRate).toFixed(2));
  cart.total = Number(
    (cart.subtotal + cart.shippingFee + cart.tax).toFixed(2),
  );
}

export function previewItemsToCartItems(
  items: CheckoutPreviewItem[],
): CartItem[] {
  return items.map((item) => ({
    id: item.productId,
    slug: item.productId,
    name: item.name,
    subtitle: item.tagline || "",
    image: item.imageUrls[0] || CART_IMAGE_FALLBACK,
    price: item.unitPrice,
    quantity: item.quantity,
  }));
}
