import type { Metadata } from "next";
import NewServiceRequestForm from "@/components/admin/service-requests/NewServiceRequestForm";

export const metadata: Metadata = {
  title: "New Service Request",
  description: "Create a new service request on behalf of a customer or walk-in.",
};

export default function NewServiceRequestPage() {
  return <NewServiceRequestForm />;
}
