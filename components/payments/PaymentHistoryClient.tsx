"use client";

import { useMemo, useState } from "react";

import PaymentFilters, { type PaymentFilter } from "./PaymentFilters";
import PaymentHistoryHeader from "./PaymentHistoryHeader";
import PaymentItem from "./PaymentItem";
import ServiceSummary from "./ServiceSummary";
import { toPaymentHistoryItem } from "@/lib/mapCustomerPayment";
import { useGetPaymentsQuery } from "@/redux/features/api/customer/profile/profileApi";

const groups = [
  {
    key: "today",
    label: "TODAY",
  },
  {
    key: "month",
    label: "THIS MONTH",
  },
  {
    key: "older",
    label: "OLDER",
  },
] as const;

export default function PaymentHistoryClient() {
  const [activeFilter, setActiveFilter] = useState<PaymentFilter>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { data, isLoading } = useGetPaymentsQuery();

  const payments = useMemo(
    () => (data ?? []).map(toPaymentHistoryItem),
    [data],
  );

  const latestService = useMemo(
    () =>
      (data ?? []).find(
        (payment) =>
          payment.purpose === "QUOTATION" && payment.quotation?.request,
      ),
    [data],
  );

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      if (activeFilter === "service" && payment.type !== "service") return false;
      if (activeFilter === "product" && payment.type !== "product") return false;
      if (activeFilter === "refund" && payment.type !== "refund") return false;
      if (from) {
        const start = new Date(`${from}T00:00:00`);
        if (payment.createdAt && new Date(payment.createdAt) < start) return false;
      }
      if (to) {
        const end = new Date(`${to}T23:59:59`);
        if (payment.createdAt && new Date(payment.createdAt) > end) return false;
      }
      return true;
    });
  }, [activeFilter, from, payments, to]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[14px] text-[#68737a]">
        Loading payment history...
      </div>
    );
  }

  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <PaymentHistoryHeader />

      <div className="mt-7">
        <PaymentFilters
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />
      </div>

      {latestService?.quotation?.request && (
        <div className="mt-6">
          <ServiceSummary
            serviceType={latestService.quotation.request.requestNumber}
            technician="Assigned technician"
            serviceDate={new Date(latestService.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )}
            duration="—"
          />
        </div>
      )}

      <div className="mt-7 space-y-8">
        {groups.map((group) => {
          const groupPayments = filteredPayments.filter(
            (payment) => payment.group === group.key,
          );

          if (!groupPayments.length) {
            return null;
          }

          return (
            <section key={group.key}>
              <div className="mb-4 flex items-center gap-4">
                <p className="shrink-0 text-[9px] font-semibold tracking-[1.3px] text-[#abb3b8]">
                  {group.label}
                </p>

                <div className="h-px flex-1 bg-[#e8ecef]" />
              </div>

              <div className="space-y-4">
                {groupPayments.map((payment) => (
                  <PaymentItem key={payment.id} payment={payment} />
                ))}
              </div>
            </section>
          );
        })}

        {filteredPayments.length === 0 && (
          <div className="rounded-[12px] bg-white py-16 text-center">
            <p className="text-[14px] text-[#68737a]">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
