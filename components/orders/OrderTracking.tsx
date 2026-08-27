import { Check, Circle, Copy, PackageCheck, Truck } from "lucide-react";

import type { Order, OrderStatus } from "@/types/commerce";

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

function formatTimelineDate(date?: string) {
  if (!date) return "Upcoming";

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OrderTracking({ order }: { order: Order }) {
  const currentIndex = statusIndex[order.status];

  const copyTrackingNumber = async () => {
    if (!order.trackingNumber) return;

    await navigator.clipboard.writeText(order.trackingNumber);
  };

  return (
    <div className="border-t border-[#e7ebef] bg-white px-5 py-6 sm:px-7">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-semibold text-[#1a73e8]">Track Order</p>

        <p className="text-[12px] text-[#6f7980]">
          Est. Delivery:{" "}
          {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-9 overflow-x-auto pb-3">
        <div className="min-w-[600px]">
          <div className="relative flex justify-between">
            {/* Background line */}
            <div className="absolute left-[5%] right-[5%] top-[17px] h-[2px] bg-[#dfe5ea]" />

            {/* Active line */}
            <div
              className="absolute left-[5%] top-[17px] h-[2px] bg-[#1a73e8] transition-all"
              style={{
                width: `${(currentIndex / (steps.length - 1)) * 90}%`,
              }}
            />

            {steps.map((step, index) => {
              const completed = index < currentIndex;
              const current = index === currentIndex;

              return (
                <div
                  key={step.key}
                  className="relative z-10 flex w-[20%] flex-col items-center text-center"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-[4px] border-white ${
                      completed || current
                        ? "bg-[#1a73e8] text-white shadow-[0_0_0_1px_#1a73e8]"
                        : "bg-[#dfe5ea] text-[#83909a]"
                    }`}
                  >
                    {completed ? (
                      <Check size={15} strokeWidth={2.5} />
                    ) : current && step.key === "processing" ? (
                      <Circle size={12} fill="white" strokeWidth={0} />
                    ) : step.key === "shipped" ? (
                      <Truck size={14} />
                    ) : step.key === "delivered" ? (
                      <PackageCheck size={14} />
                    ) : (
                      <Circle size={8} fill="currentColor" strokeWidth={0} />
                    )}
                  </div>

                  <p
                    className={`mt-3 text-[11px] font-semibold ${
                      completed || current ? "text-[#30373c]" : "text-[#8a959d]"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-[9px] text-[#879198]">
                    {formatTimelineDate(order.statusHistory?.[step.key])}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[8px] bg-[#f1f6ff] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.7px] text-[#74818a]">
            Carrier Details
          </p>

          <div className="mt-2 flex items-center gap-2">
            <PackageCheck size={17} className="text-[#1a73e8]" />

            <span className="text-[12px] font-semibold text-[#333b40]">
              UPS: {order.trackingNumber ?? "Tracking pending"}
            </span>

            {order.trackingNumber && (
              <button
                type="button"
                onClick={copyTrackingNumber}
                aria-label="Copy tracking number"
                className="text-[#808b93] hover:text-[#1a73e8]"
              >
                <Copy size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="rounded-[8px] bg-[#f1f6ff] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.7px] text-[#74818a]">
            Delivery Address
          </p>

          <p className="mt-2 text-[12px] font-medium leading-[19px] text-[#333b40]">
            {order.shippingAddress.address}
            {order.shippingAddress.apartment &&
              `, ${order.shippingAddress.apartment}`}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
}