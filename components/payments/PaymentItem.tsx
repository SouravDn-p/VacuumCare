"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Box, RotateCcw, ShoppingBag, Wrench } from "lucide-react";

export type PaymentType = "service" | "product" | "refund";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface PaymentData {
  id: string;
  title: string;
  reference: string;
  transactionId: string;
  date: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  group: "today" | "month" | "older";
  createdAt?: string;
}

interface PaymentItemProps {
  payment: PaymentData;
}

function PaymentIcon({ type, size, strokeWidth }: { type: PaymentType; size?: number; strokeWidth?: number }) {
  switch (type) {
    case "service":
      return <Wrench size={size} strokeWidth={strokeWidth} />;
    case "product":
      return <ShoppingBag size={size} strokeWidth={strokeWidth} />;
    case "refund":
      return <RotateCcw size={size} strokeWidth={strokeWidth} />;
    default:
      return <Box size={size} strokeWidth={strokeWidth} />;
  }
}

function getStatusStyles(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return "bg-[#dff7e9] text-[#27924d]";
    case "pending":
      return "bg-[#fff0d6] text-[#cc8300]";
    case "failed":
      return "bg-[#ffe1df] text-[#d83932]";
    case "refunded":
      return "bg-[#e5efff] text-[#1a73e8]";
  }
}

export default function PaymentItem({ payment }: PaymentItemProps) {
  const isRetry = payment.status === "failed";
  const actionLabel = isRetry ? "Retry Payment" : "View Invoice";

  const handleRetry = () => {
    toast.error("This payment cannot be retried automatically. Please place the order again or contact support.");
  };

  return (
    <article className="flex flex-col gap-5 rounded-[10px] bg-white px-5 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.025)] sm:flex-row sm:items-center">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ${
          payment.status === "failed"
            ? "bg-[#fff0ef] text-[#d83333]"
            : "bg-[#eef5ff] text-[#1a73e8]"
        }`}
      >
        <PaymentIcon type={payment.type} size={18} strokeWidth={1.8} />
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <h3
          className="text-[13px] sm:text-[14px] font-semibold text-[#252c31]"
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          {payment.title}
        </h3>

        <p className="mt-1 text-[9px] sm:text-[10px] text-[#748089]">
          REF: #{payment.reference} • TXN: {payment.transactionId} •{" "}
          {payment.date}
        </p>
      </div>

      {/* Price */}
      <div className="sm:text-right">
        <p
          className={`text-[18px] font-bold ${
            payment.status === "failed" ? "text-[#333b40]" : "text-[#1a73e8]"
          }`}
        >
          ${payment.amount.toFixed(2)}
        </p>

        <span
          className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${getStatusStyles(
            payment.status,
          )}`}
        >
          {payment.status}
        </span>
      </div>

      {/* Action */}
      {isRetry ? (
        <button
          type="button"
          onClick={handleRetry}
          className="shrink-0 text-left text-[11px] font-semibold text-[#1a73e8] hover:underline sm:w-[110px] sm:text-right"
        >
          {actionLabel}
        </button>
      ) : (
        <Link
          href={`/payment-history/${payment.id}`}
          className="shrink-0 text-left text-[11px] font-semibold text-[#1a73e8] hover:underline sm:w-[110px] sm:text-right"
        >
          {actionLabel}
        </Link>
      )}
    </article>
  );
}
