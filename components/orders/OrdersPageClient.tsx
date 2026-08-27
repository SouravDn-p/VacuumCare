"use client";

import { useMemo, useState } from "react";

import OrderCard from "./OrderCard";
import { toStoreOrder } from "@/lib/mapCustomerOrder";
import { useGetMyOrdersQuery } from "@/redux/features/api/customer/orders/ordersApi";
import type { CustomerOrderGroup } from "@/types/customer/orders";

type OrderTab = CustomerOrderGroup;

const tabs: {
  label: string;
  value: OrderTab;
}[] = [
  {
    label: "All Orders",
    value: "all",
  },
  {
    label: "Active Orders",
    value: "active",
  },
  {
    label: "Complete Orders",
    value: "complete",
  },
];

export default function OrdersPageClient() {
  const [activeTab, setActiveTab] = useState<OrderTab>("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const { data, isLoading } = useGetMyOrdersQuery({
    group: activeTab,
    page: 1,
    pageSize: 50,
  });

  const orders = useMemo(
    () => (data?.items ?? []).map(toStoreOrder),
    [data],
  );

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[14px] text-[#68737a]">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <div className="rounded-[14px] border border-[#e7eff7] bg-white px-5 py-5">
        <h1
          className="text-[30px] sm:text-[34px] font-extrabold leading-[1.1] text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          My Orders
        </h1>

        <p
          className="mt-2 text-[13px] sm:text-[14px] text-[#59636a]"
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          Track and manage your AuraClean infrastructure purchases.
        </p>
      </div>

      <div className="mt-7 flex gap-4 sm:gap-8 overflow-x-auto border-b border-transparent">
        {tabs.map((tab) => {
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setActiveTab(tab.value);
                setExpandedOrderId(null);
              }}
              className={`relative whitespace-nowrap pb-3 text-[13px] sm:text-[14px] transition ${
                active
                  ? "font-semibold text-[#1a73e8]"
                  : "text-[#707a81] hover:text-[#1a73e8]"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#1a73e8]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              expanded={expandedOrderId === order.id}
              onToggleTracking={() =>
                setExpandedOrderId((current) =>
                  current === order.id ? null : order.id,
                )
              }
            />
          ))
        ) : (
          <div className="rounded-[14px] bg-white px-6 py-16 text-center">
            <p className="text-[15px] text-[#68737a]">
              No orders found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
