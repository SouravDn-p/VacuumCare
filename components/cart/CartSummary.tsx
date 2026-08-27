import Link from "next/link";

import { BadgeCheck } from "lucide-react";

import { formatCurrency } from "@/lib/commerce";

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function CartSummary({ subtotal, shipping, tax, total }: Props) {
  return (
    <aside className="rounded-[16px] bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <h2
        className="text-[24px] font-bold text-[#20252b]"
        style={{
          fontFamily: "Manrope, sans-serif",
        }}
      >
        Order Summary
      </h2>

      <div className="mt-7 space-y-4 text-[14px]">
        <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />

        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "Free" : formatCurrency(shipping)}
          highlight={shipping === 0}
        />

        <SummaryRow label="Tax" value={formatCurrency(tax)} />
      </div>

      <div className="border-t border-[#e6e9ed] mt-7 pt-6 flex justify-between items-center">
        <span className="font-semibold">Total</span>

        <span className="text-[28px] font-bold text-[#1a73e8]">
          {formatCurrency(total)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-7 flex h-[52px] items-center justify-center rounded-[9px] bg-gradient-to-r from-[#0754c6] to-[#1a73e8] text-white font-semibold"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/products"
        className="mt-3 flex h-[52px] items-center justify-center rounded-[9px] bg-[#edf5ff] text-[#24292e] font-semibold"
      >
        Continue Shopping
      </Link>

      <div className="mt-6 rounded-[8px] bg-[#edf5ff] p-4 flex gap-3">
        <BadgeCheck size={20} className="text-[#1a73e8] shrink-0" />

        <p className="text-[13px] leading-[20px] text-[#505960]">
          Your order is protected by our 10-year architectural wellness
          guarantee.
        </p>
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-[#454d54]">{label}</span>

      <span
        className={`font-semibold ${
          highlight ? "text-[#23685d]" : "text-[#24292e]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
