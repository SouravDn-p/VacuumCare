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
import { mapServerCartItems } from "@/types/customer/cart";
import { getAccessToken } from "@/lib/useCookies";
import { calculateCartTotals } from "@/lib/commerce";
import {
  useAddCartItemMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/api/customer/cart/cartApi";

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
  const [guestItems, setGuestItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const mergedRef = useRef(false);

  const { data: serverCart, isSuccess, isError } = useGetCartQuery(undefined, {
    skip: !hasToken,
  });
  const [addCartItem] = useAddCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearServerCart] = useClearCartMutation();

  useEffect(() => {
    const token = Boolean(getAccessToken());
    setHasToken(token);
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
  }, []);

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
        await removeCartItem(id).unwrap();
        return;
      }
      setGuestItems((current) => current.filter((item) => item.id !== id));
    },
    [removeCartItem],
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(id);
        return;
      }
      if (getAccessToken()) {
        await updateCartItem({ productId: id, quantity }).unwrap();
        return;
      }
      setGuestItems((current) =>
        current.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
    [removeItem, updateCartItem],
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
