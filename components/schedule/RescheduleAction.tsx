"use client";

import { useState } from "react";

import { Check } from "lucide-react";

export default function RescheduleAction() {
  const [requested, setRequested] = useState(false);

  if (requested) {
    return (
      <span className="inline-flex h-[44px] items-center gap-2 rounded-[8px] bg-green-50 px-6 text-sm font-semibold text-green-700">
        <Check size={16} strokeWidth={2.2} />
        Reschedule requested
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRequested(true)}
      className="h-[44px] rounded-[8px] bg-[#2478e8] px-7 text-sm font-semibold text-white"
    >
      Reschedule
    </button>
  );
}
