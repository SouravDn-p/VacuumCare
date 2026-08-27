"use client";

import Link from "next/link";
import InvoiceView from "@/components/invoices/InvoiceView";
import { useGetPaymentInvoiceQuery } from "@/redux/features/api/customer/payment/paymentApi";

export default function InvoicePageClient({
  paymentId,
  backHref = "/payment-history",
  backLabel = "Back to payment history",
}: {
  paymentId: string;
  backHref?: string;
  backLabel?: string;
}) {
  const { data, isLoading, isError } = useGetPaymentInvoiceQuery(paymentId);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[14px] text-[#68737a]">
        Loading invoice...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-[12px] bg-white py-16 text-center">
        <p className="text-[14px] text-[#68737a]">This invoice could not be loaded.</p>
        <Link href={backHref} className="mt-4 inline-block text-[13px] font-semibold text-[#1a73e8]">
          {backLabel}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={backHref}
        className="invoice-actions mb-5 inline-block text-[13px] font-semibold text-[#1a73e8] hover:underline"
      >
        {backLabel}
      </Link>
      <InvoiceView invoice={data} />
    </div>
  );
}
