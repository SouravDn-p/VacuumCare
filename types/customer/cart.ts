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
