import ServiceRequestDetails from "@/components/service-requests/ServiceRequestDetails";
import type { Metadata } from "next";



interface Props {
  params: Promise<{
    requestId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Service Request Details",
};

export default async function ServiceRequestDetailsPage({
  params,
}: Props) {
  const { requestId } = await params;

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[1200px]">
          <ServiceRequestDetails
            requestId={requestId}
          />
        </div>
      </section>
    </main>
  );
}