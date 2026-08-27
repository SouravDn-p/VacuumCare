import type { Metadata } from "next";
import ServiceQuotation from "../quotation/[requestId]/page";

export const metadata: Metadata = {
  title: "Service Quotation",
  description: "Review your service quotation and request negotiation.",
};

export default function ServiceQuotationPage() {
  return (
    <main className="bg-white min-h-screen">
      <ServiceQuotation />
    </main>
  );
}
