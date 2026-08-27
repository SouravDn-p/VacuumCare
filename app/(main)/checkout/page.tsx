import type { Metadata } from "next";

import Link from "next/link";

import CheckoutPageClient from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <main>
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32 pb-28">
        <div className="flex gap-1 text-[13px] text-[#1a73e8] mb-16">
          <Link href="/">Home</Link>

          <span>›</span>

          <Link href="/products">Store</Link>

          <span>›</span>

          <span>Checkout</span>
        </div>

        <CheckoutPageClient />
      </section>
    </main>
  );
}
