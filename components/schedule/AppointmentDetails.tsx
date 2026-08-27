import { CalendarDays } from "lucide-react";

import {
  formatAppointmentDate,
  formatAppointmentTime,
  technicianDisplayName,
  technicianRoleLabel,
} from "@/lib/serviceSchedule";
import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";

export default function AppointmentDetails({
  request,
}: {
  request: CustomerServiceRequest;
}) {
  const start = formatAppointmentDate(request.scheduledStart);
  const windowLabel = request.scheduledStart
    ? `${formatAppointmentTime(request.scheduledStart)}${
        request.scheduledEnd
          ? ` – ${formatAppointmentTime(request.scheduledEnd)}`
          : ""
      }`
    : "Waiting for the office";

  return (
    <section>
      <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#0875f5]">
        <CalendarDays size={18} />
        Appointment details
      </h2>

      <div className="mt-5 rounded-[14px] bg-[#f1f5ff] p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase text-[#667085]">
              Schedule Date
            </p>

            <p className="mt-2 font-bold text-[#12344d]">{start}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase text-[#667085]">
              Window
            </p>

            <p className="mt-2 text-[#344054]">{windowLabel}</p>
          </div>
        </div>

        <hr className="my-5 border-[#dce5f3]" />

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
            {request.technician?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={request.technician.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div>
            <h3 className="font-bold text-[#101828]">
              {technicianDisplayName(request)}
            </h3>

            <p className="text-sm text-[#667085]">
              {technicianRoleLabel(request)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
