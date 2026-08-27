"use client";

import { useState } from "react";

import { CalendarDays } from "lucide-react";

export type PaymentFilter = "all" | "service" | "product" | "refund";

interface PaymentFiltersProps {
  activeFilter: PaymentFilter;
  onChange: (filter: PaymentFilter) => void;
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

const filters: {
  label: string;
  value: PaymentFilter;
}[] = [
  {
    label: "All Transactions",
    value: "all",
  },
  {
    label: "Service Payments",
    value: "service",
  },
  {
    label: "Product Payments",
    value: "product",
  },
  {
    label: "Refunds",
    value: "refund",
  },
];

export default function PaymentFilters({
  activeFilter,
  onChange,
  from,
  to,
  onFromChange,
  onToChange,
}: PaymentFiltersProps) {
  const [showDateRange, setShowDateRange] = useState(false);
  const appliedLabel = from && to ? `${from} – ${to}` : from || to || null;

  return (
    <div className="flex flex-col gap-4 rounded-[12px] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.025)] sm:flex-row sm:items-center sm:justify-between">
      {/* Tabs */}
      <div className="inline-flex max-w-full overflow-x-auto rounded-[8px] bg-[#f2f6fb] p-1">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange(filter.value)}
              className={`h-9 whitespace-nowrap rounded-[7px] px-5 text-[12px] font-medium transition ${
                active
                  ? "bg-white text-[#1a73e8] shadow-sm"
                  : "text-[#505960] hover:text-[#1a73e8]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Date range */}
      <div className="relative w-fit">
        <button
          type="button"
          onClick={() => setShowDateRange((current) => !current)}
          className="inline-flex h-9 w-fit items-center gap-2 rounded-[8px] bg-[#f2f6fb] px-4 text-[12px] font-medium text-[#505960] hover:text-[#1a73e8]"
        >
          <CalendarDays size={15} strokeWidth={1.8} />
          {appliedLabel ?? "Date Range"}
        </button>

        {showDateRange && (
          <div className="absolute right-0 top-11 z-10 w-[260px] rounded-[10px] border border-[#e5eaf0] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <label className="block text-[11px] font-semibold text-[#505960]">
              From
            </label>

            <input
              type="date"
              value={from}
              onChange={(event) => onFromChange(event.target.value)}
              className="mt-1 h-9 w-full rounded-[7px] border border-[#e5eaf0] px-2 text-[12px] outline-none focus:border-[#1a73e8]"
            />

            <label className="mt-3 block text-[11px] font-semibold text-[#505960]">
              To
            </label>

            <input
              type="date"
              value={to}
              onChange={(event) => onToChange(event.target.value)}
              className="mt-1 h-9 w-full rounded-[7px] border border-[#e5eaf0] px-2 text-[12px] outline-none focus:border-[#1a73e8]"
            />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onFromChange("");
                  onToChange("");
                  setShowDateRange(false);
                }}
                className="h-8 flex-1 rounded-[7px] border border-[#e5eaf0] text-[11px] font-semibold text-[#505960]"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setShowDateRange(false)}
                className="h-8 flex-1 rounded-[7px] bg-[#1a73e8] text-[11px] font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
