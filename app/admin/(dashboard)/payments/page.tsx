import type { Metadata } from "next";
import PaymentsHeader from "@/components/admin/payments/PaymentsHeader";
import PaymentsContainer from "@/components/admin/payments/PaymentsContainer";

export const metadata: Metadata = {
  title: "Payments",
  description: "View payment transactions and details",
};

export default function PaymentsPage() {
  return (
    <div className="pay-page">
      <PaymentsHeader />
      <PaymentsContainer />
    </div>
  );
}
