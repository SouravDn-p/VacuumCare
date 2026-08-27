"use client";

import Image from "next/image";
import Link from "next/link";

import { Trash2 } from "lucide-react";

import { useCart } from "@/context/CartContext";

import { formatCurrency } from "@/lib/commerce";

import type { CartItem } from "@/types/commerce";

export default function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <article className="rounded-[14px] border border-[#e5e9ee] bg-white p-4">
      <div className="flex gap-4">
        {/* Image */}
        <Link
          href={`/products/${item.slug}`}
          className="relative w-[112px] h-[112px] shrink-0 rounded-[12px] border border-[#edf0f3] overflow-hidden"
        >
              <Image
                src={item.image || "/images/web-logo.png"}
                alt={item.name}
            fill
            className="object-contain p-3"
          />
        </Link>

        {/* Information */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4">
            <div>
              <Link
                href={`/products/${item.slug}`}
                className="text-[17px] font-semibold text-[#1a73e8]"
              >
                {item.name}
              </Link>

              <p className="mt-2 text-[14px] text-[#4f5960]">{item.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => void removeItem(item.id)}
              className="h-9 w-9 rounded-[8px] bg-[#f1f6ff] flex items-center justify-center text-[#1a73e8] hover:text-red-500"
              aria-label="Remove product"
            >
              <Trash2 size={17} />
            </button>
          </div>

          <div className="flex items-end justify-between mt-4 flex-wrap gap-2">
            {/* Quantity */}
            <div className="inline-flex h-8 items-center rounded-[8px] border border-[#dfe5eb]">
              <button
                type="button"
                className="w-9 text-[#1a73e8]"
                onClick={() => void updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>

              <span className="w-9 text-center text-[13px] text-[#1a73e8]">
                {item.quantity}
              </span>

              <button
                type="button"
                className="w-9 text-[#1a73e8]"
                onClick={() => void updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="text-[15px] font-semibold text-[#1a73e8]">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
