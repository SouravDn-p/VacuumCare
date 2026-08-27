import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { getAccessToken } from "@/lib/useCookies";

export async function addToCartOrLogin(add: () => Promise<void>) {
  if (!getAccessToken()) {
    toast.error("Please log in to add this to your cart.");
    return;
  }

  try {
    await add();
    toast.success("Added to your cart.");
  } catch (error) {
    toast.error(getApiErrorMessage(error, "Could not add this to your cart."));
  }
}

export function requireLoginForPurchase() {
  if (getAccessToken()) return true;
  toast.error("Please log in to buy this product.");
  return false;
}
