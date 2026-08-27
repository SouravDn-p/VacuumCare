import type { AdminPaginatedResult, AdminPersonSummary } from "./common";

export type AdminPaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "AUTHORIZED"
  | "CAPTURED"
  | "VOIDED"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "EXPIRED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export type AdminPaymentPurpose = "ORDER" | "QUOTATION";

export interface AdminPaymentListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: AdminPaymentStatus;
  purpose?: AdminPaymentPurpose;
  userId?: string;
  orderId?: string;
  requestId?: string;
}

export interface AdminPayment {
  id: string;
  status: AdminPaymentStatus;
  purpose: AdminPaymentPurpose;
  provider: string;
  paymentMethod: string | null;
  amount: number | string;
  refundedAmount: number | string;
  currency: string;
  user: AdminPersonSummary;
  orderId: string | null;
  orderNumber: string | null;
  requestId: string | null;
  requestNumber: string | null;
  providerReference: string | null;
  failureMessage?: string | null;
  actionEligibility: {
    canCapture: boolean;
    canRefundOrder: boolean;
  };
  createdAt: string;
  updatedAt: string;
  quotation?: {
    request?: {
      id: string;
      requestNumber: string;
      status: string;
    } | null;
  } | null;
}

export type AdminPaymentPage = AdminPaginatedResult<AdminPayment>;
