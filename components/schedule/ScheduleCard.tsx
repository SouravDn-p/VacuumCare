import Link from "next/link";

import { canCancelAppointment } from "@/lib/serviceSchedule";
import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";

interface Props {
  request: CustomerServiceRequest;
  title: string;
  technician: string;
  time: string;
  cancelling?: boolean;
  onCancel?: (id: string) => void;
}

export default function ScheduleCard({
  request,
  title,
  technician,
  time,
  cancelling,
  onCancel,
}: Props) {
  const href =
    request.scheduledStart || request.status === "SCHEDULED"
      ? `/schedule/${request.id}`
      : `/service-requests/${request.id}`;

  const actionLabel =
    request.status === "IN_PROGRESS" || request.status === "REPORT_SUBMITTED"
      ? "View Details"
      : request.status === "ACCEPTED"
        ? "View Request"
        : request.status === "COMPLETED"
          ? "View Details"
          : "View Appointment";

  return (
    <div className="relative rounded-[16px] border-l-[4px] border-[#1a73e8] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
      <div className="flex justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#eaf3ff] px-3 py-1 text-[11px] font-semibold text-[#0875f5]">
              {formatStatus(request.status)}
            </span>

            <span className="text-xs text-[#667085]">◷ {time}</span>
          </div>

          <h2 className="mt-4 text-[18px] font-bold text-[#0875f5]">
            {title}
          </h2>

          <p className="mt-2 text-[14px] text-[#475467]">
            {request.description}
          </p>

          <p className="mt-2 text-[12px] text-[#667085]">
            #{request.requestNumber}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#edf4ff] px-4 py-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-300">
              {request.technician?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={request.technician.avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <span className="text-sm font-medium">{technician}</span>
          </div>
        </div>

        <Link
          href={href}
          className="self-center rounded-[8px] bg-[#2478e8] px-6 py-3 text-sm font-semibold text-white"
        >
          {actionLabel}
        </Link>
      </div>

      {canCancelAppointment(request) && (
        <button
          type="button"
          onClick={() => onCancel?.(request.id)}
          disabled={cancelling}
          className="absolute right-8 bottom-5 text-sm font-semibold text-red-600 disabled:opacity-50"
        >
          {cancelling ? "Cancelling..." : "Cancel"}
        </button>
      )}
    </div>
  );
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}
