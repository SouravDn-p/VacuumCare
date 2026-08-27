import type { PaymentData, PaymentStatus, PaymentType } from "@/components/payments/PaymentItem";
import type { CustomerPayment } from "@/types/customer/profile/profileTypes";

function money(value: number | string) {
  return Number(value) || 0;
}

function toUiStatus(status: CustomerPayment["status"]): PaymentStatus {
  if (status === "FAILED") return "failed";
  if (status === "REFUNDED" || status === "PARTIALLY_REFUNDED") return "refunded";
  if (
    status === "PENDING" ||
    status === "PROCESSING" ||
    status === "AUTHORIZED"
  ) {
    return "pending";
  }
  return "paid";
}

function toUiType(payment: CustomerPayment): PaymentType {
  const status = toUiStatus(payment.status);
  if (status === "refunded") return "refund";
  return payment.purpose === "QUOTATION" ? "service" : "product";
}

function groupFor(date: Date): PaymentData["group"] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  if (date >= startOfToday) return "today";
  if (date >= startOfMonth) return "month";
  return "older";
}

export function toPaymentHistoryItem(payment: CustomerPayment): PaymentData {
  const created = new Date(payment.createdAt);
  const request = payment.quotation?.request;
  const title =
    payment.purpose === "QUOTATION"
      ? `Service Payment - ${request?.requestNumber ?? "Service request"}`
      : `Product Order - ${payment.order?.orderNumber ?? "Store order"}`;

  return {
    id: payment.id,
    title,
    reference: request?.requestNumber ?? payment.order?.orderNumber ?? payment.id,
    transactionId:
      payment.stripePaymentIntentId ??
      payment.providerReference ??
      payment.id,
    date: created.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).toUpperCase(),
    amount: money(payment.amount),
    type: toUiType(payment),
    status: toUiStatus(payment.status),
    group: groupFor(created),
    createdAt: payment.createdAt,
  };
}
