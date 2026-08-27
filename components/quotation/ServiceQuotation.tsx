"use client";

import { useState } from "react";

import Image from "next/image";
import NegotiationModal from "./NegotiationModal";
import NegotiationRequestCard from "./NegotiationRequestCard";

import { CheckCircle, XCircle } from "lucide-react";

import { useChat } from "@/context/ChatContext";

type QuotationStatus = "pending" | "accepted" | "rejected";

export default function ServiceQuotation() {
  const { openChat } = useChat();

  const [showNegotiation, setShowNegotiation] = useState(false);

  const [quotationStatus, setQuotationStatus] =
    useState<QuotationStatus>("pending");

  const [negotiationRequest, setNegotiationRequest] = useState<null | {
    amount: number;
    note: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
  }>(null);

  const handleNegotiationSubmit = (data: { amount: number; note: string }) => {
    setNegotiationRequest({
      amount: data.amount,
      note: data.note,
      status: "PENDING",
    });
  };

  return (
    <section className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10 pt-28 pb-32">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[32px] sm:text-[36px] font-extrabold text-[#1a73e8]">
            Service Quotation
          </h1>

          <p className="mt-3 max-w-[700px] text-[15px] leading-6 text-[#667085]">
            Detailed breakdown for your recent service request regarding the
            AeroFlow Central Unit.
          </p>
        </div>

        <button
          type="button"
          onClick={openChat}
          className="h-[44px] rounded-[8px] bg-[#1a73e8] px-6 text-[14px] font-semibold text-white hover:bg-[#0865d7]"
        >
          Live Chat
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Service Summary */}
        <div className="rounded-[16px] border border-[#e7edf5] bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-8 bg-[#1a73e8]" />

            <h2 className="text-[20px] font-bold text-[#1a73e8]">
              Service Summary
            </h2>
          </div>

          <div className="mt-7 rounded-[12px] bg-[#f2f6ff] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
              Service Type
            </p>

            <h3 className="mt-2 text-[20px] font-bold text-[#0875f5]">
              Vacuum Repair
            </h3>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
              Identified Problem
            </p>

            <p className="mt-2 text-[15px] leading-6 text-[#344054]">
              Unit is losing suction and making a high-pitched whistling noise
              during operation.
            </p>
          </div>

          {/* Images */}
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="relative flex h-[170px] items-center justify-center overflow-hidden rounded-[12px] border border-[#edf1f5]">
              <Image
                src="/images/products/vacuum.png"
                alt="vacuum"
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>

            <div className="relative flex h-[170px] items-center justify-center overflow-hidden rounded-[12px] border border-[#edf1f5]">
              <Image
                src="/images/products/vacuum-2.png"
                alt="vacuum"
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Quotation Details */}
        <div className="rounded-[16px] border border-[#e7edf5] bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[20px] font-bold text-[#1a73e8]">
              Quotation Details
            </h2>

            <span className="rounded-full bg-red-100 px-3 py-1 text-[12px] font-semibold text-red-600">
              Valid 2 Hours
            </span>
          </div>

          <div className="mt-7 space-y-5">
            <PriceRow title="Labor & Inspection" price="$85.00" />
            <PriceRow title="Replacement Filter" price="$45.00" />
            <PriceRow title="Motor Seal Gasket" price="$22.00" />

            <div className="border-t pt-5 flex items-center justify-between">
              <span className="font-bold text-[#0875f5]">Total Amount</span>

              <span className="text-[26px] font-extrabold text-[#0875f5]">
                $163.20
              </span>
            </div>
          </div>

          <div className="mt-7 rounded-[12px] bg-[#f2f6ff] p-5">
            <h3 className="text-[15px] font-bold">Technician Notes</h3>

            <p className="mt-2 text-[14px] leading-6 text-[#667085]">
              The primary motor seal has deteriorated causing the whistling
              noise.
            </p>
          </div>

          {quotationStatus === "pending" && (
            <>
              <button
                type="button"
                onClick={() => setQuotationStatus("accepted")}
                className="mt-7 h-[48px] w-full rounded-[8px] bg-[#1a73e8] text-[15px] font-semibold text-white"
              >
                Accept Quotation
              </button>

              <button
                type="button"
                onClick={() => setQuotationStatus("rejected")}
                className="mt-3 h-[48px] w-full rounded-[8px] border border-[#dbe4f0] text-[15px] font-semibold text-[#344054]"
              >
                Reject Quotation
              </button>

              <button
                type="button"
                onClick={() => setShowNegotiation(true)}
                className="mt-5 w-full text-[14px] font-semibold text-[#0875f5] hover:underline"
              >
                Go for negotiation →
              </button>
            </>
          )}

          {quotationStatus === "accepted" && (
            <div className="mt-7 flex items-center gap-3 rounded-[10px] bg-green-50 px-4 py-3 text-[14px] font-semibold text-green-700">
              <CheckCircle size={18} strokeWidth={2} />
              Quotation accepted. Our team will confirm scheduling shortly.
            </div>
          )}

          {quotationStatus === "rejected" && (
            <div className="mt-7 flex items-center gap-3 rounded-[10px] bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-600">
              <XCircle size={18} strokeWidth={2} />
              Quotation rejected. You can request a new quote or start a
              negotiation.
            </div>
          )}
        </div>
      </div>

      {/* Negotiation Request */}
      {negotiationRequest && (
        <NegotiationRequestCard
          amount={negotiationRequest.amount}
          originalAmount={163.2}
          note={negotiationRequest.note}
          status={negotiationRequest.status}
        />
      )}

      <NegotiationModal
        open={showNegotiation}
        onClose={() => setShowNegotiation(false)}
        quotationAmount={163.2}
        onSubmit={handleNegotiationSubmit}
      />
    </section>
  );
}

function PriceRow({ title, price }: { title: string; price: string }) {
  return (
    <div className="flex justify-between text-[15px]">
      <span className="text-[#667085]">{title}</span>
      <span className="font-semibold text-[#344054]">{price}</span>
    </div>
  );
}
