"use client";

import { useState } from "react";

import ScheduleCard from "@/components/schedule/ScheduleCard";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  formatAppointmentWindow,
  isCompletedAppointment,
  isUpcomingAppointment,
  technicianDisplayName,
} from "@/lib/serviceSchedule";
import {
  useCancelServiceRequestMutation,
  useGetServiceRequestsQuery,
} from "@/redux/features/api/customer/service/customerServiceApi";

type Tab = "upcoming" | "completed";

export default function ScheduleList() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [actionError, setActionError] = useState("");

  const { data: requests = [], isLoading, error } =
    useGetServiceRequestsQuery();

  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelServiceRequestMutation();

  const visibleRequests = requests.filter((request) =>
    activeTab === "upcoming"
      ? isUpcomingAppointment(request)
      : isCompletedAppointment(request),
  );

  const handleCancel = async (requestId: string) => {
    setActionError("");

    try {
      await cancelRequest({
        requestId,
        data: {
          reason: "Cancelled from My Schedule",
        },
      }).unwrap();
    } catch (err) {
      setActionError(
        getApiErrorMessage(err, "Unable to cancel this appointment."),
      );
    }
  };

  return (
    <>
      <div className="mt-8 flex gap-6 border-b border-[#edf1f5]">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 text-sm font-semibold ${
            activeTab === "upcoming"
              ? "text-[#0875f5] border-b-2 border-[#0875f5]"
              : "text-[#667085]"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("completed")}
          className={`pb-4 text-sm font-semibold ${
            activeTab === "completed"
              ? "text-[#0875f5] border-b-2 border-[#0875f5]"
              : "text-[#667085]"
          }`}
        >
          Completed
        </button>
      </div>

      {actionError && (
        <p className="mt-4 text-center text-sm text-red-600">{actionError}</p>
      )}

      <div className="mt-6 space-y-5">
        {isLoading ? (
          <p className="py-10 text-center text-sm text-[#667085]">
            Loading appointments...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-sm text-red-600">
            Unable to load your schedule.
          </p>
        ) : visibleRequests.length > 0 ? (
          visibleRequests.map((request) => (
            <ScheduleCard
              key={request.id}
              request={request}
              title={
                request.issue?.name ||
                request.category?.name ||
                "Service appointment"
              }
              technician={technicianDisplayName(request)}
              time={formatAppointmentWindow(request)}
              cancelling={isCancelling}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p className="py-10 text-center text-sm text-[#667085]">
            No {activeTab} appointments.
          </p>
        )}
      </div>
    </>
  );
}
