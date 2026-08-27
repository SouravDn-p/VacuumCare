import type {
  CustomerServiceRequest,
  ServiceRequestStatus,
} from "@/types/customer/service/customerTypes";

const UPCOMING_STATUSES = new Set<ServiceRequestStatus>([
  "ACCEPTED",
  "SCHEDULED",
  "IN_PROGRESS",
  "REPORT_SUBMITTED",
]);

const COMPLETED_STATUSES = new Set<ServiceRequestStatus>([
  "COMPLETED",
]);

export function isUpcomingAppointment(request: CustomerServiceRequest) {
  return UPCOMING_STATUSES.has(request.status);
}

export function isCompletedAppointment(request: CustomerServiceRequest) {
  return COMPLETED_STATUSES.has(request.status);
}

export function canCancelAppointment(request: CustomerServiceRequest) {
  return (
    request.status === "ACCEPTED" || request.status === "SCHEDULED"
  );
}

export function technicianDisplayName(request: CustomerServiceRequest) {
  const technician = request.technician;

  if (!technician) {
    return request.status === "ACCEPTED"
      ? "Waiting for assignment"
      : "Technician to be assigned";
  }

  return `${technician.firstName} ${technician.lastName}`.trim();
}

export function technicianRoleLabel(request: CustomerServiceRequest) {
  const skills = request.technician?.technician?.skills;

  if (skills?.length) {
    return skills[0];
  }

  return request.category?.name || "Field technician";
}

export function formatAppointmentDate(iso: string | null) {
  if (!iso) return "Not scheduled yet";

  return new Date(iso).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatAppointmentTime(iso: string | null) {
  if (!iso) return "";

  return new Date(iso).toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatAppointmentWindow(request: CustomerServiceRequest) {
  if (!request.scheduledStart) {
    return request.status === "ACCEPTED"
      ? "Waiting for the office to confirm a time"
      : "Time to be confirmed";
  }

  const date = formatAppointmentDate(request.scheduledStart);
  const start = formatAppointmentTime(request.scheduledStart);
  const end = formatAppointmentTime(request.scheduledEnd);

  return end ? `${date} • ${start} – ${end}` : `${date} • ${start}`;
}

export function historyAt(
  request: CustomerServiceRequest,
  status: ServiceRequestStatus,
) {
  return (
    request.statusHistory.find((entry) => entry.status === status)
      ?.createdAt ?? null
  );
}
