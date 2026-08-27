import type { Metadata } from "next";
import InvoicePageClient from "@/components/invoices/InvoicePageClient";

export const metadata: Metadata = {
  title: "Invoice",
  description: "View and print your Enhancement invoice.",
};

export default async function PaymentInvoicePage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;

  return (
    <main className="bg-[#f5f8fb]">
      <section className="mx-auto max-w-[980px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <InvoicePageClient paymentId={paymentId} />
      </section>
    </main>
  );
}
