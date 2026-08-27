import type { Metadata } from "next";
import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import OrdersContainer from "@/components/admin/orders/OrdersContainer";

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage and organize customer orders",
};

export default function OrdersPage() {
  return (
    <div className="ord-page">
      <OrdersHeader />
      <OrdersContainer />
    </div>
  );
}
