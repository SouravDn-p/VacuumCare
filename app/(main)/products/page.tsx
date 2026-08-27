import { Suspense } from "react";
import type { Metadata } from "next";

import ProductsShopClient from "@/components/products/ProductsShopClient";
import ShopHero from "@/components/products/ShopHero";

export const metadata: Metadata = {
  title: "Central Vacuum Products",
  description:
    "Shop premium central vacuum systems, accessories and professional cleaning equipment.",
};

export default function ProductsPage() {
  return (
    <main>
      <ShopHero />

      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <Suspense
          fallback={
            <p className="py-16 text-center text-[14px] text-[#68737a]">
              Loading products...
            </p>
          }
        >
          <ProductsShopClient />
        </Suspense>
      </section>
    </main>
  );
}
