"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";
import OrderTracking from "./OrderTracking";

import { formatCurrency } from "@/lib/commerce";

import type { Order } from "@/types/commerce";

interface OrderCardProps {
  order: Order;
  expanded: boolean;
  onToggleTracking: () => void;
}

export default function OrderCard({
  order,
  expanded,
  onToggleTracking,
}: OrderCardProps) {
  const firstItem = order.items[0];

  return (
    <article className="overflow-hidden rounded-[14px] border border-[#e9edf2] bg-white">
      {/* Order information */}
      <div className="px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left info */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#7d888f]">
                Order ID
              </p>

              <p className="mt-1 text-[14px] font-bold text-[#252b30]">
                #{order.orderNumber ?? order.id}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#7d888f]">
                Date
              </p>

              <p className="mt-1 text-[13px] text-[#3f474d]">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <OrderStatusBadge status={order.status} />
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#7d888f]">
                Total
              </p>

              <p className="mt-1 text-[19px] font-bold text-[#1a73e8]">
                {formatCurrency(order.total)}
              </p>
            </div>

            <Link
              href={`/orders/${order.id}`}
              className={`inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] px-5 text-[12px] font-semibold transition ${
                order.status !== "delivered"
                  ? "bg-[#1a73e8] text-white hover:bg-[#0865d7]"
                  : "bg-[#f1f4f7] text-[#333b40] hover:bg-[#e6ebf0]"
              }`}
            >
              View Details
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="border-t border-dashed border-[#dce2e7] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-5">
          <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[8px] bg-[#fafbfc]">
            {firstItem?.image ? (
              <Image
                src={firstItem.image}
                alt={firstItem.name}
                fill
                sizes="68px"
                className="object-contain p-2"
              />
            ) : null}
          </div>

          <div>
            <h3
              className="text-[15px] font-bold text-[#262d32]"
              style={{
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {firstItem?.name ?? "Order items"}
            </h3>

            <p className="mt-1 text-[11px] text-[#68737a]">
              {firstItem?.subtitle}
            </p>

            <p className="mt-1 text-[11px] font-medium text-[#1a73e8]">
              Qty: {firstItem?.quantity ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Tracking button */}
      <div className="border-t border-[#edf0f2]">
        <button
          type="button"
          onClick={onToggleTracking}
          className="flex w-full items-center gap-2 px-6 py-4 text-left text-[12px] font-semibold text-[#1a73e8]"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Track Order
        </button>
      </div>

      {expanded && <OrderTracking order={order} />}
    </article>
  );
}
