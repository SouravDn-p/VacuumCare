import type {
  CustomerServiceRequest,
  ServicePayment,
  ServicePaymentStatus,
} from "@/types/customer/service/customerTypes";

const HOLD_STATUSES = new Set<ServicePaymentStatus>([
  "AUTHORIZED",
  "CAPTURED",
  "SUCCEEDED",
]);

export function getLatestServicePayment(
  request: CustomerServiceRequest,
): ServicePayment | undefined {
  return request.quotation?.payments?.[0];
}

export function isServiceHoldActive(
  payment?: ServicePayment | null,
): boolean {
  return Boolean(payment && HOLD_STATUSES.has(payment.status));
}

const PAST_AUTHORIZATION = new Set([
  "SCHEDULED",
  "IN_PROGRESS",
  "REPORT_SUBMITTED",
  "COMPLETED",
  "CANCELLED",
]);

export function needsServiceAuthorization(
  request: CustomerServiceRequest,
): boolean {
  if (request.quotation?.status !== "ACCEPTED") return false;
  if (PAST_AUTHORIZATION.has(request.status)) return false;

  return !isServiceHoldActive(getLatestServicePayment(request));
}
