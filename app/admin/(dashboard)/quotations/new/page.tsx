import { Suspense } from "react";
import type { Metadata } from "next";
import CreateQuotationContainer from "@/components/admin/quotations/create/CreateQuotationContainer";

export const metadata: Metadata = {
  title: "Create Quotation",
  description: "Create and send price breakdown quotations to customers",
};

export default function CreateQuotationPage() {
  return (
    <Suspense>
      <CreateQuotationContainer />
    </Suspense>
  );
}
