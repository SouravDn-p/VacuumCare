"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AppointmentDetails from "@/components/schedule/AppointmentDetails";
import ScheduleTimeline from "@/components/schedule/ScheduleTimeline";
import ServiceOverview from "@/components/schedule/ServiceOverview";
import { useGetServiceRequestByIdQuery } from "@/redux/features/api/customer/service/customerServiceApi";

export default function ScheduleDetailsClient({
  requestId,
}: {
  requestId: string;
}) {
  const {
    data: request,
    isLoading,
    error,
  } = useGetServiceRequestByIdQuery(requestId);

  if (isLoading) {
    return (
      <p className="py-20 text-center text-sm text-[#667085]">
        Loading appointment...
      </p>
    );
  }

  if (error || !request) {
    return (
      <div className="rounded-[14px] bg-white px-6 py-20 text-center">
        <h1 className="text-[28px] font-extrabold text-[#1a73e8]">
          Appointment not found
        </h1>

        <Link
          href="/schedule"
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a73e8]"
        >
          <ArrowLeft size={14} />
          Return to My Schedule
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/schedule"
            className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6f7980] hover:text-[#1a73e8]"
          >
            <ArrowLeft size={13} />
            My Schedule
          </Link>

          <h1 className="text-[32px] font-extrabold text-[#1a73e8] sm:text-[36px]">
            Service Schedule
          </h1>

          <p className="mt-2 text-[15px] text-[#667085]">
            Request #{request.requestNumber}
          </p>
        </div>
      </div>

      <ScheduleTimeline request={request} />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_.75fr]">
        <AppointmentDetails request={request} />
        <ServiceOverview request={request} />
      </div>
    </>
  );
}
