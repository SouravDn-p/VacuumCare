import type { Metadata } from "next";

import ServiceRequestsPageClient from "@/components/service-requests/ServiceRequestsPageClient";

export const metadata: Metadata = {
  title: "Service Requests",
  description: "View and track your Enhancement service requests.",
};

export default function ServiceRequestsPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[900px]">
          <ServiceRequestsPageClient />
        </div>
      </section>
    </main>
  );
}