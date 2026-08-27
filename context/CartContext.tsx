"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/types/commerce";
import {
  applyServerCartQuantity,
  mapServerCartItems,
} from "@/types/customer/cart";
import { getAccessToken, AUTH_CHANGED_EVENT } from "@/lib/useCookies";
import { calculateCartTotals } from "@/lib/commerce";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  cartApi,
  useAddCartItemMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/api/customer/cart/cartApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "@/redux/store/store";

interface CartTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  ready: boolean;
  cartCount: number;
  totals: CartTotals;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "elite-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [guestItems, setGuestItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const mergedRef = useRef(false);
  const quantityTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const pendingQuantity = useRef<Record<string, number>>({});

  const { data: serverCart, isSuccess, isError } = useGetCartQuery(undefined, {
    skip: !hasToken,
  });
  const [addCartItem] = useAddCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearServerCart] = useClearCartMutation();

  useEffect(() => {
    const syncToken = () => setHasToken(Boolean(getAccessToken()));
    syncToken();
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setGuestItems(
          parsed.map((item) => ({
            ...item,
            id: String(item.id),
          })),
        );
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
    } finally {
      setReady(true);
    }

    window.addEventListener("focus", syncToken);
    window.addEventListener(AUTH_CHANGED_EVENT, syncToken);
    return () => {
      window.removeEventListener("focus", syncToken);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncToken);
    };
  }, []);

  useEffect(() => {
    if (!hasToken) mergedRef.current = false;
  }, [hasToken]);

  useEffect(() => {
    if (!ready || hasToken) return;
    localStorage.setItem(CART_KEY, JSON.stringify(guestItems));
  }, [guestItems, ready, hasToken]);

  useEffect(() => {
    if (!hasToken || !isSuccess || mergedRef.current) return;
    mergedRef.current = true;
    const pending = guestItems;
    if (!pending.length) {
      localStorage.removeItem(CART_KEY);
      return;
    }
    void (async () => {
      for (const item of pending) {
        await addCartItem({
          productId: item.id,
          quantity: item.quantity,
        }).unwrap().catch(() => undefined);
      }
      setGuestItems([]);
      localStorage.removeItem(CART_KEY);
    })();
  }, [addCartItem, guestItems, hasToken, isSuccess]);

  const items = hasToken ? mapServerCartItems(serverCart) : guestItems;

  const totals = useMemo<CartTotals>(() => {
    if (hasToken && serverCart) {
      return {
        subtotal: serverCart.subtotal,
        shipping: serverCart.shippingFee,
        tax: serverCart.tax,
        total: serverCart.total,
      };
    }
    return calculateCartTotals(items);
  }, [hasToken, items, serverCart]);

  const patchCachedQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch(
        cartApi.util.updateQueryData("getCart", undefined, (draft) => {
          applyServerCartQuantity(draft, productId, quantity);
        }),
      );
    },
    [dispatch],
  );

  const flushQuantity = useCallback(
    async (productId: string) => {
      const quantity = pendingQuantity.current[productId];
      delete pendingQuantity.current[productId];
      delete quantityTimers.current[productId];
      if (quantity === undefined) return;
      try {
        if (quantity <= 0) {
          await removeCartItem(productId).unwrap();
          return;
        }
        await updateCartItem({ productId, quantity }).unwrap();
      } catch (error) {
        dispatch(cartApi.util.invalidateTags(["Cart"]));
        toast.error(getApiErrorMessage(error, "Could not update quantity."));
      }
    },
    [dispatch, removeCartItem, updateCartItem],
  );

  const scheduleQuantitySync = useCallback(
    (productId: string, quantity: number) => {
      pendingQuantity.current[productId] = quantity;
      if (quantityTimers.current[productId]) {
        clearTimeout(quantityTimers.current[productId]);
      }
      quantityTimers.current[productId] = setTimeout(() => {
        void flushQuantity(productId);
      }, 280);
    },
    [flushQuantity],
  );

  useEffect(() => {
    const timers = quantityTimers.current;
    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">, quantity = 1) => {
      if (getAccessToken()) {
        await addCartItem({ productId: item.id, quantity }).unwrap();
        return;
      }
      setGuestItems((current) => {
        const existing = current.find((cartItem) => cartItem.id === item.id);
        if (existing) {
          return current.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem,
          );
        }
        return [...current, { ...item, quantity }];
      });
    },
    [addCartItem],
  );

  const removeItem = useCallback(
    async (id: string) => {
      if (getAccessToken()) {
        patchCachedQuantity(id, 0);
        try {
          await removeCartItem(id).unwrap();
        } catch (error) {
          dispatch(cartApi.util.invalidateTags(["Cart"]));
          toast.error(getApiErrorMessage(error, "Could not remove this item."));
        }
        return;
      }
      setGuestItems((current) => current.filter((item) => item.id !== id));
    },
    [dispatch, patchCachedQuantity, removeCartItem],
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (!getAccessToken()) {
        if (quantity <= 0) {
          setGuestItems((current) =>
            current.filter((item) => item.id !== id),
          );
          return;
        }
        setGuestItems((current) =>
          current.map((item) => (item.id === id ? { ...item, quantity } : item)),
        );
        return;
      }

      patchCachedQuantity(id, quantity);
      scheduleQuantitySync(id, quantity);
    },
    [patchCachedQuantity, scheduleQuantitySync],
  );

  const clearCart = useCallback(async () => {
    if (getAccessToken()) {
      await clearServerCart().unwrap();
      return;
    }
    setGuestItems([]);
  }, [clearServerCart]);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        ready: ready && (!hasToken || isSuccess || isError),
        cartCount,
        totals,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
