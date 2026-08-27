import type { AdminPaginatedResult, AdminPersonSummary } from "./common";
import type { AdminServiceRequestStatus } from "./serviceRequests";

export type AdminQuoteStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export type AdminCounterofferStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminQuotationListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: AdminQuoteStatus;
  customerId?: string;
}

export interface AdminNegotiationSummary {
  id: string;
  requestedTotal: number;
  note: string | null;
  status: AdminCounterofferStatus;
  createdAt: string;
}

export interface AdminQuotationItem {
  id: string;
  quoteNumber: string;
  status: AdminQuoteStatus;
  laborAmount?: number;
  partsAmount?: number;
  taxAmount?: number;
  discountAmount?: number;
  notes?: string | null;
  totalAmount: number;
  negotiatedTotal: number | null;
  validUntil: string;
  createdAt?: string;
  request: {
    id: string;
    requestNumber: string;
    status: AdminServiceRequestStatus;
  };
  customer: AdminPersonSummary;
  pendingNegotiation: AdminNegotiationSummary | null;
}

export type AdminQuotationPage = AdminPaginatedResult<AdminQuotationItem>;

export interface AdminDecideCounterofferBody {
  note?: string;
}
