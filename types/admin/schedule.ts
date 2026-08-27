import type { AdminNamedEntity, AdminPersonSummary } from "./common";
import type { AdminServiceRequestStatus } from "./serviceRequests";

export interface AdminScheduleQuery {
  from: string;
  to: string;
  timezone?: string;
  technicianId?: string;
  status?: AdminServiceRequestStatus[];
}

export interface AdminScheduleAddress {
  line1: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AdminScheduleItem {
  id: string;
  requestNumber: string;
  status: AdminServiceRequestStatus;
  description: string;
  customer: AdminPersonSummary;
  technician: AdminPersonSummary | null;
  category: AdminNamedEntity;
  issue: AdminNamedEntity | null;
  scheduledStart: string;
  scheduledEnd: string | null;
  createdAt: string;
  address: AdminScheduleAddress;
}
