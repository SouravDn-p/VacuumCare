import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

import type { OrderStatus } from "@/types/commerce";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const configs = {
    placed: {
      label: "Placed",
      icon: CheckCircle2,
      className: "bg-[#e5f0ff] text-[#1a73e8]",
    },

    pending: {
      label: "Pending",
      icon: Clock3,
      className: "bg-[#e8f1fb] text-[#5c7b99]",
    },

    paid: {
      label: "Paid",
      icon: CheckCircle2,
      className: "bg-[#e1f0ff] text-[#1a73e8]",
    },

    processing: {
      label: "Processing",
      icon: LoaderCircle,
      className: "bg-[#e6eef7] text-[#607a91]",
    },

    shipped: {
      label: "Shipped",
      icon: Truck,
      className: "bg-[#e4efff] text-[#1a73e8]",
    },

    delivered: {
      label: "Delivered",
      icon: PackageCheck,
      className: "bg-[#dff7e9] text-[#2f9a55]",
    },

    cancelled: {
      label: "Cancelled",
      icon: Clock3,
      className: "bg-[#f3f4f6] text-[#6b7280]",
    },

    refunded: {
      label: "Refunded",
      icon: CheckCircle2,
      className: "bg-[#e5efff] text-[#1a73e8]",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${config.className}`}
    >
      <Icon size={12} strokeWidth={2} />

      {config.label}
    </span>
  );
}
