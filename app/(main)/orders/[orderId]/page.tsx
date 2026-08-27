import type { Metadata } from "next";

import OrderDetails from "@/components/orders/OrderDetails";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params;

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[1000px]">
          <OrderDetails orderId={orderId} />
        </div>
      </section>
    </main>
  );
}
