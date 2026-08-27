import type { Metadata } from "next";

import OrdersPageClient from "@/components/orders/OrdersPageClient";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your Elite Central Vacuum orders.",
};

export default function OrdersPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[820px]">
          <OrdersPageClient />
        </div>
      </section>
    </main>
  );
}
