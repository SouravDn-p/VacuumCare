import {
  CheckCircle,
  CircleCheck,
  Clock3,
  Wrench,
} from "lucide-react";

import { historyAt } from "@/lib/serviceSchedule";
import type {
  CustomerServiceRequest,
  ServiceRequestStatus,
} from "@/types/customer/service/customerTypes";

const steps = [
  {
    key: "ACCEPTED" as const,
    title: "Request Accepted",
    desc: "Your quotation was accepted and the card hold is ready.",
    icon: CheckCircle,
  },
  {
    key: "SCHEDULED" as const,
    title: "Service Scheduled",
    desc: "A technician and appointment window are confirmed.",
    icon: Clock3,
  },
  {
    key: "IN_PROGRESS" as const,
    title: "In Progress",
    desc: "The technician is working on your request.",
    icon: Wrench,
  },
  {
    key: "COMPLETED" as const,
    title: "Completed",
    desc: "Service report submitted and work finished.",
    icon: CircleCheck,
  },
];

const statusIndex: Record<ServiceRequestStatus, number> = {
  NEW: 0,
  UNDER_REVIEW: 0,
  QUOTE_SENT: 0,
  ACCEPTED: 0,
  SCHEDULED: 1,
  IN_PROGRESS: 2,
  REPORT_SUBMITTED: 2,
  COMPLETED: 3,
  CANCELLED: 0,
};

export default function ScheduleTimeline({
  request,
}: {
  request: CustomerServiceRequest;
}) {
  const currentIndex = statusIndex[request.status];
  const technician = request.technician
    ? `${request.technician.firstName} ${request.technician.lastName}`
    : "your technician";

  return (
    <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
      <div className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-[#dce5f3] md:block" />

      {steps.map((item, index) => {
        const Icon = item.icon;
        const active = index <= currentIndex && request.status !== "CANCELLED";
        const at = historyAt(
          request,
          item.key === "COMPLETED" ? completedHistoryStatus(request) : item.key,
        );

        return (
          <div key={item.title} className="relative text-center">
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-[7px] text-white ${
                active
                  ? "border-[#dbeaff] bg-[#2478e8]"
                  : "border-[#edf1f5] bg-[#c5ccd4]"
              }`}
            >
              <Icon size={18} />
            </div>

            <h3 className="mt-6 text-[15px] font-semibold text-[#101828]">
              {item.title}
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-[#475467]">
              {item.key === "SCHEDULED" && request.technician
                ? `${technician} has been assigned to your appointment.`
                : item.desc}
            </p>

            {at && (
              <p className="mt-3 text-xs text-[#98a2b3]">
                {new Date(at).toLocaleString("en-CA", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function completedHistoryStatus(
  request: CustomerServiceRequest,
): ServiceRequestStatus {
  if (request.statusHistory.some((entry) => entry.status === "COMPLETED")) {
    return "COMPLETED";
  }

  return "REPORT_SUBMITTED";
}
