import type { Metadata } from "next";

import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <main>
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32 pb-28">
        <h1
          className="text-[36px] sm:text-[42px] font-extrabold text-[#1a73e8] mb-16"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Your Cart
        </h1>

        <CartPageClient />
      </section>
    </main>
  );
}
