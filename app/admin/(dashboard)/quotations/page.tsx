import type { Metadata } from "next";
import QuotationsHeader from "@/components/admin/quotations/QuotationsHeader";
import QuotationsContainer from "@/components/admin/quotations/QuotationsContainer";

export const metadata: Metadata = {
  title: "Quotations",
  description: "Create and manage customer service and equipment quotations",
};

export default function QuotationsPage() {
  return (
    <div className="quote-page">
      <QuotationsHeader />
      <QuotationsContainer />
    </div>
  );
}
