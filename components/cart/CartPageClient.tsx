"use client";

import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";

import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";

export default function CartPageClient() {
  const { items, ready, totals } = useCart();

  if (!ready) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!items.length) {
    return (
      <div className="py-32 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#eef6ff] flex items-center justify-center">
          <ShoppingBag className="text-[#1a73e8]" />
        </div>

        <h2 className="mt-5 text-[28px] font-bold text-[#1a73e8]">
          Your cart is empty
        </h2>

        <Link
          href="/products"
          className="mt-6 px-8 h-12 rounded-[9px] bg-[#1a73e8] text-white font-semibold inline-flex items-center"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10">
      <div className="rounded-[16px] bg-white p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="space-y-5">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <CartSummary {...totals} />
    </div>
  );
}
