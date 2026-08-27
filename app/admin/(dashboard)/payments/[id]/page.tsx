import type { Metadata } from "next";
import InvoicePageClient from "@/components/invoices/InvoicePageClient";

export const metadata: Metadata = {
  title: "Invoice",
  description: "View a customer invoice from payment history",
};

export default async function AdminPaymentInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="pay-page">
      <InvoicePageClient
        paymentId={id}
        backHref="/admin/payments"
        backLabel="Back to payments"
      />
    </div>
  );
}
