import type { Metadata } from "next";
import ServiceRequestsHeader from "@/components/admin/service-requests/ServiceRequestsHeader";
import ServiceRequestsContainer from "@/components/admin/service-requests/ServiceRequestsContainer";

export const metadata: Metadata = {
  title: "Service Requests",
  description: "Manage and track all service requests across various statuses.",
};

export default function ServiceRequestsPage() {
  return (
    <>
      <ServiceRequestsHeader />
      <ServiceRequestsContainer />
    </>
  );
}
