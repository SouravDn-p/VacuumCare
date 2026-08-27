export const BUY_NOW_KEY = "elite-buy-now";

export interface BuyNowPayload {
  productId: string;
  quantity: number;
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
}

export function readBuyNow(): BuyNowPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(BUY_NOW_KEY);
    return raw ? (JSON.parse(raw) as BuyNowPayload) : null;
  } catch {
    return null;
  }
}

export function writeBuyNow(payload: BuyNowPayload) {
  sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify(payload));
}

export function clearBuyNow() {
  sessionStorage.removeItem(BUY_NOW_KEY);
}
