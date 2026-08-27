import type { ReactNode } from "react";

export type PaymentTab =
  | "Service authorizations"
  | "Captured payments"
  | "Refunded payments"
  | "Failed payments"
  | "Store payments";

export interface ServiceAuthorizationItem {
  id: string;
  customer: string;
  serviceRequest: string;
  authorizedAmount: string;
  paymentStatus: "Authorized" | "Captured";
  serviceStatus: "Report submitted" | "Scheduled" | "Completed" | "Under review";
  actions?: ReactNode;
}

export interface FailedPaymentItem {
  id: string;
  customer: string;
  serviceRequest: string;
  amount: string;
  reason: string;
  date: string;
  status: "Failed";
}

export interface StorePaymentItem {
  id: string;
  order: string;
  customer: string;
  amount: string;
  method: string;
  date: string;
  status: string;
  invoiceHref?: string;
}

export const PAYMENT_TABS: PaymentTab[] = [
  "Service authorizations",
  "Captured payments",
  "Refunded payments",
  "Failed payments",
  "Store payments",
];

export const SERVICE_AUTHORIZATIONS_LIST: ServiceAuthorizationItem[] = [
  {
    id: "auth-1",
    customer: "Amelia Roberts",
    serviceRequest: "SR-1048",
    authorizedAmount: "$245.00",
    paymentStatus: "Authorized",
    serviceStatus: "Report submitted",
  },
  {
    id: "auth-2",
    customer: "Amelia Roberts",
    serviceRequest: "SR-1048",
    authorizedAmount: "$245.00",
    paymentStatus: "Authorized",
    serviceStatus: "Scheduled",
  },
  {
    id: "auth-3",
    customer: "Amelia Roberts",
    serviceRequest: "SR-1048",
    authorizedAmount: "$245.00",
    paymentStatus: "Captured",
    serviceStatus: "Completed",
  },
  {
    id: "auth-4",
    customer: "Amelia Roberts",
    serviceRequest: "SR-1048",
    authorizedAmount: "$245.00",
    paymentStatus: "Authorized",
    serviceStatus: "Under review",
  },
];

export const FAILED_PAYMENTS_LIST: FailedPaymentItem[] = [
  {
    id: "fail-1",
    customer: "Mark Wilson",
    serviceRequest: "SR-1048",
    amount: "$310.00",
    reason: "Card declined",
    date: "Jul 28, 2026",
    status: "Failed",
  },
];

export const STORE_PAYMENTS_LIST: StorePaymentItem[] = [
  {
    id: "sp-1",
    order: "ORD-9021",
    customer: "Mark Wilson",
    amount: "$310.00",
    method: "Credit Card",
    date: "Jul 28, 2026",
    status: "Paid",
  },
  {
    id: "sp-2",
    order: "ORD-9022",
    customer: "Mark Wilson",
    amount: "$310.00",
    method: "Stripe",
    date: "Jul 28, 2026",
    status: "Paid",
  },
  {
    id: "sp-3",
    order: "ORD-9023",
    customer: "Mark Wilson",
    amount: "$310.00",
    method: "Credit Card",
    date: "Jul 28, 2026",
    status: "Paid",
  },
  {
    id: "sp-4",
    order: "ORD-9024",
    customer: "Mark Wilson",
    amount: "$310.00",
    method: "Credit Card",
    date: "Jul 28, 2026",
    status: "Paid",
  },
];
