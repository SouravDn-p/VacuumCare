import type { Metadata } from "next";

import PaymentHistoryClient from "@/components/payments/PaymentHistoryClient";

export const metadata: Metadata = {
  title: "Payment History",
  description:
    "View and manage your Elite Central Vacuum transaction and payment history.",
};

export default function PaymentHistoryPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[1000px]">
          <PaymentHistoryClient />
        </div>
      </section>
    </main>
  );
}
