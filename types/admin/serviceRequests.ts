import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";

import type {
  AdminNamedEntity,
  AdminPaginatedResult,
  AdminPersonSummary,
} from "./common";
import type { AdminNegotiationSummary } from "./quotations";

export type AdminServiceRequestStatus =
  | "NEW"
  | "UNDER_REVIEW"
  | "QUOTE_SENT"
  | "ACCEPTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "REPORT_SUBMITTED"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminServiceRequestListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: AdminServiceRequestStatus;
  customerId?: string;
  technicianId?: string;
  categoryId?: string;
  issueId?: string;
}

export interface AdminServiceRequestItem {
  id: string;
  requestNumber: string;
  status: AdminServiceRequestStatus;
  description: string;
  customer: AdminPersonSummary;
  technician: AdminPersonSummary | null;
  category: AdminNamedEntity;
  issue: AdminNamedEntity | null;
  scheduledStart: string | null;
  createdAt: string;
  quotation?: {
    id: string;
    totalAmount: number;
    negotiatedTotal: number | null;
    pendingNegotiation: AdminNegotiationSummary | null;
  } | null;
}

export type AdminServiceRequestPage =
  AdminPaginatedResult<AdminServiceRequestItem>;

export type AdminServiceRequestDetail = CustomerServiceRequest;

export interface AdminCreateQuoteBody {
  laborAmount: number;
  partsAmount: number;
  taxAmount: number;
  discountAmount?: number;
  notes?: string;
  validUntil: string;
}

export interface AdminAssignTechnicianBody {
  technicianId: string;
  scheduledStart: string;
  scheduledEnd: string;
}

export interface AdminReviewRequestBody {
  status: "UNDER_REVIEW";
  note?: string;
}
