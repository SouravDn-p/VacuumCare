"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function NegotiationModal({
  open,
  onClose,
  quotationAmount,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  quotationAmount: number;
  onSubmit: (data: { amount: number; note: string }) => void;
}) {
  const [amount, setAmount] = useState("");

  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-[450px] rounded-[16px] bg-white p-7">
        <button onClick={onClose} className="float-right">
          <X />
        </button>

        <h2 className="text-xl font-bold text-[#1a73e8]">
          Request Negotiation
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Current quotation: ${quotationAmount}
        </p>

        <label className="mt-5 block text-sm font-semibold">
          Your Proposed Price *
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 h-12 w-full rounded-lg border px-4"
        />

        <label className="mt-5 block text-sm font-semibold">Note *</label>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-lg border p-4"
        />

        <button
          onClick={() => {
            onSubmit({
              amount: Number(amount),
              note,
            });

            onClose();
          }}
          className="mt-6 h-12 w-full rounded-lg bg-[#1a73e8] text-white font-semibold"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}
