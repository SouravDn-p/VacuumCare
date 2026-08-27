"use client";

import Image from "next/image";
import Link from "next/link";

import { Check, Circle, Copy, PackageCheck, Truck } from "lucide-react";
import { useState } from "react";

import OrderStatusBadge from "./OrderStatusBadge";

import { formatCurrency } from "@/lib/commerce";
import { toStoreOrder } from "@/lib/mapCustomerOrder";
import { useGetMyOrderQuery } from "@/redux/features/api/customer/orders/ordersApi";

import type { OrderStatus } from "@/types/commerce";

const steps: {
  key: OrderStatus;
  label: string;
}[] = [
  {
    key: "placed",
    label: "Order Placed",
  },
  {
    key: "paid",
    label: "Payment Confirmed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
];

const statusIndex: Record<OrderStatus, number> = {
  placed: 0,
  pending: 1,
  paid: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 0,
  refunded: 4,
};

export default function OrderDetails({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);
  const { data, isLoading, isError } = useGetMyOrderQuery(orderId);
  const order = data ? toStoreOrder(data) : null;

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[#68737a]">Loading order...</div>
    );
  }

  if (isError || !order) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-[30px] font-bold text-[#1a73e8]">
          Order not found
        </h1>

        <Link
          href="/orders"
          className="mt-5 inline-block text-[14px] font-semibold text-[#1a73e8] hover:underline"
        >
          Return to My Orders
        </Link>
      </div>
    );
  }

  const currentIndex = statusIndex[order.status];

  const copyTracking = async () => {
    if (!order.trackingNumber) return;

    await navigator.clipboard.writeText(order.trackingNumber);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        {/* =====================================================
            LEFT
        ====================================================== */}
        <div className="space-y-5">
          {/* Header */}
          <section className="rounded-[14px] border border-[#e5edf6] bg-white px-5 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1
                  className="text-[29px] sm:text-[34px] font-extrabold text-[#1a73e8]"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Order Details
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#67727a]">
                  <span>Order #{order.id}</span>
                  <span>•</span>
                  <span>
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <OrderStatusBadge status={order.status} />
            </div>
          </section>

          {/* Track Order */}
          <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[13px] font-semibold text-[#1a73e8]">
                Track Order
              </h2>

              <p className="text-[12px] text-[#667179]">
                Delivery:{" "}
                <span className="font-semibold text-[#333b40]">
                  {new Date(order.estimatedDelivery).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </span>
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-9 overflow-x-auto">
              <div className="relative flex min-w-[600px] justify-between pb-5">
                <div className="absolute left-[5%] right-[5%] top-[17px] h-[2px] bg-[#dce3e8]" />

                <div
                  className="absolute left-[5%] top-[17px] h-[2px] bg-[#1a73e8]"
                  style={{
                    width: `${(currentIndex / (steps.length - 1)) * 90}%`,
                  }}
                />

                {steps.map((step, index) => {
                  const completed = index < currentIndex;
                  const active = index === currentIndex;

                  return (
                    <div
                      key={step.key}
                      className="relative z-10 flex w-[20%] flex-col items-center text-center"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-[4px] border-white ${
                          completed || active
                            ? "bg-[#1a73e8] text-white shadow-[0_0_0_1px_#1a73e8]"
                            : "bg-[#dfe5e9] text-[#869198]"
                        }`}
                      >
                        {completed ? (
                          <Check size={15} strokeWidth={2.5} />
                        ) : active ? (
                          <Circle size={10} fill="white" strokeWidth={0} />
                        ) : step.key === "shipped" ? (
                          <Truck size={14} />
                        ) : step.key === "delivered" ? (
                          <PackageCheck size={14} />
                        ) : (
                          <Circle
                            size={8}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        )}
                      </div>

                      <p
                        className={`mt-3 text-[10px] font-semibold ${
                          completed || active
                            ? "text-[#31383d]"
                            : "text-[#8a959d]"
                        }`}
                      >
                        {step.label}
                      </p>

                      <p className="mt-1 text-[8px] text-[#8a959d]">
                        {order.statusHistory?.[step.key]
                          ? new Date(
                              order.statusHistory[step.key]!,
                            ).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "Upcoming"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking information */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[8px] bg-[#f0f5ff] p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.7px] text-[#727e86]">
                  Carrier Details
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <PackageCheck size={17} className="text-[#1a73e8]" />

                  <span className="text-[11px] font-semibold">
                    UPS: {order.trackingNumber ?? "Tracking number pending"}
                  </span>

                  {order.trackingNumber && (
                    <button
                      type="button"
                      onClick={copyTracking}
                      className="text-[#76828a] hover:text-[#1a73e8]"
                      title={copied ? "Copied" : "Copy tracking number"}
                    >
                      <Copy size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-[8px] bg-[#f0f5ff] p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.7px] text-[#727e86]">
                  Delivery Address
                </p>

                <p className="mt-2 text-[11px] font-medium leading-[18px]">
                  {order.shippingAddress.address}
                  {order.shippingAddress.apartment &&
                    `, ${order.shippingAddress.apartment}`}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
              </div>
            </div>
          </section>

          {/* Order Items */}
          <section className="overflow-hidden rounded-[14px] border-l-2 border-[#1a73e8] bg-white">
            <div className="flex items-center justify-between border-b border-dashed border-[#dce2e7] px-5 py-4">
              <h2 className="text-[15px] font-semibold text-[#1a73e8]">
                Order Items
              </h2>

              <span className="rounded-full bg-[#e3efff] px-3 py-1 text-[10px] font-semibold text-[#1a73e8]">
                ✓ PAID
              </span>
            </div>

            <div className="divide-y divide-[#eef1f3]">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center"
                >
                  <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[8px] bg-[#fafbfc]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="70px"
                        className="object-contain p-2"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[14px] font-bold text-[#30373c]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[11px] text-[#6e7880]">
                      {item.subtitle}
                    </p>

                    <p className="mt-2 text-[11px] font-medium text-[#1a73e8]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.6px] text-[#768189]">
                      Total
                    </p>

                    <p className="mt-1 text-[19px] font-bold text-[#1a73e8]">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =====================================================
            RIGHT SUMMARY
        ====================================================== */}
        <aside
          className="h-fit rounded-[12px] p-6 text-white lg:sticky lg:top-28"
          style={{
            background: "linear-gradient(145deg, #0754bd 0%, #1a73e8 100%)",
          }}
        >
          <h2
            className="text-[21px] font-bold"
            style={{
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Order Summary
          </h2>

          <div className="mt-5 h-px bg-white/15" />

          <div className="mt-6 space-y-4 text-[12px]">
            <SummaryRow
              label="Subtotal"
              value={formatCurrency(order.subtotal)}
            />

            <SummaryRow
              label="Shipping"
              value={
                order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)
              }
            />

            <SummaryRow
              label="Estimated Tax"
              value={formatCurrency(order.tax)}
            />
          </div>

          <div className="mt-6 h-px bg-white/15" />

          <div className="mt-6 flex items-end justify-between gap-4">
            <span className="text-[14px] font-semibold">Total</span>

            <span className="text-[30px] font-extrabold">
              {formatCurrency(order.total)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-white/85">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
