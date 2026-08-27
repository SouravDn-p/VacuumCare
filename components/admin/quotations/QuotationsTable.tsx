import Link from "next/link";
import { type QuotationStatus } from "./quotationsData";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import type { AdminQuotationItem, AdminQuoteStatus } from "@/types/admin/quotations";

interface QuotationsTableProps {
  quotations: AdminQuotationItem[];
  onApproveCounteroffer?: (counterofferId: string) => void;
  onRejectCounteroffer?: (counterofferId: string) => void;
}

const STATUS_LABEL: Record<AdminQuoteStatus, QuotationStatus> = {
  DRAFT: "Draft",
  SENT: "Sent",
  VIEWED: "Viewed",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
};

function getStatusBadgeClass(status: QuotationStatus): string {
  switch (status) {
    case "Draft":
      return "quote-badge--draft";
    case "Accepted":
      return "quote-badge--accepted";
    case "Sent":
      return "quote-badge--sent";
    case "Viewed":
      return "quote-badge--viewed";
    case "Rejected":
      return "quote-badge--rejected";
    case "Expired":
      return "quote-badge--expired";
    case "Cancelled":
      return "quote-badge--cancelled";
    default:
      return "quote-badge--draft";
  }
}

function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "------";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function customerName(item: AdminQuotationItem) {
  return `${item.customer.firstName} ${item.customer.lastName}`.trim();
}

function quoteDisabledReason(item: AdminQuotationItem) {
  if (item.status === "ACCEPTED") {
    return "This quotation was accepted and can no longer be changed.";
  }
  if (item.status === "CANCELLED") {
    return "This quotation was cancelled and cannot be revised.";
  }
  switch (item.request.status) {
    case "ACCEPTED":
      return "The service request was accepted. Assign a technician instead of revising the quote.";
    case "SCHEDULED":
      return "This request is already scheduled, so the quotation cannot be revised.";
    case "IN_PROGRESS":
      return "This request is in progress, so the quotation cannot be revised.";
    case "REPORT_SUBMITTED":
      return "This request already has a report, so the quotation cannot be revised.";
    case "COMPLETED":
      return "This request is completed, so the quotation cannot be revised.";
    case "CANCELLED":
      return "This request was cancelled, so the quotation cannot be revised.";
    default:
      return "This quotation cannot be revised in its current status.";
  }
}

function assignDisabledReason(item: AdminQuotationItem) {
  if (item.request.status === "SCHEDULED") {
    return "A technician is already assigned to this request.";
  }
  if (
    item.request.status === "IN_PROGRESS" ||
    item.request.status === "REPORT_SUBMITTED" ||
    item.request.status === "COMPLETED"
  ) {
    return "This request is already in progress or completed.";
  }
  if (item.request.status === "CANCELLED") {
    return "This request was cancelled, so a technician cannot be assigned.";
  }
  if (item.status !== "ACCEPTED") {
    return "Assign is available after the customer accepts the quotation.";
  }
  return "Assign is available after the customer accepts the quotation and payment is authorized.";
}

export default function QuotationsTable({
  quotations,
  onApproveCounteroffer,
  onRejectCounteroffer,
}: QuotationsTableProps) {
  return (
    <div className="quote-table-card">
      <div className="quote-table-scroll">
        <table className="quote-table" aria-label="Customer quotations list">
          <thead>
            <tr>
              <th className="quote-table__th" scope="col">Quote ID</th>
              <th className="quote-table__th" scope="col">Customer</th>
              <th className="quote-table__th" scope="col">Service</th>
              <th className="quote-table__th" scope="col">Amount</th>
              <th className="quote-table__th" scope="col">Sent</th>
              <th className="quote-table__th" scope="col">Expires</th>
              <th className="quote-table__th" scope="col">Status</th>
              <th className="quote-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={8} className="quote-table__empty-cell">
                  <p className="quote-table__empty-text">No requests in this status.</p>
                </td>
              </tr>
            ) : (
              quotations.map((qt) => {
                const status = STATUS_LABEL[qt.status];
                const amount = qt.negotiatedTotal ?? qt.totalAmount;
                const canAssign = qt.request.status === "ACCEPTED";
                const canRevise =
                  qt.status !== "ACCEPTED" &&
                  qt.status !== "CANCELLED" &&
                  qt.request.status !== "ACCEPTED" &&
                  qt.request.status !== "SCHEDULED" &&
                  qt.request.status !== "IN_PROGRESS" &&
                  qt.request.status !== "REPORT_SUBMITTED" &&
                  qt.request.status !== "COMPLETED" &&
                  qt.request.status !== "CANCELLED";
                const pending = qt.pendingNegotiation;

                return (
                  <tr key={qt.id} className="quote-table__tr">
                    <td className="quote-table__td quote-table__td--id">
                      {qt.quoteNumber}
                    </td>
                    <td className="quote-table__td quote-table__td--customer">
                      {customerName(qt)}
                    </td>
                    <td className="quote-table__td quote-table__td--service">
                      {qt.request.requestNumber}
                    </td>
                    <td className="quote-table__td quote-table__td--amt">
                      {formatMoney(amount)}
                      {pending ? ` · counter ${formatMoney(pending.requestedTotal)}` : ""}
                    </td>
                    <td className="quote-table__td quote-table__td--date">
                      {qt.status === "DRAFT" ? "------" : formatDate(qt.createdAt)}
                    </td>
                    <td className="quote-table__td quote-table__td--date">
                      {formatDate(qt.validUntil)}
                    </td>
                    <td className="quote-table__td quote-table__td--status">
                      <span className={`quote-badge ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="quote-table__td quote-table__td--action">
                      <div className="quote-actions-cell admin-btn-row">
                        <Link
                          href={`/admin/quotations/new?requestId=${qt.request.id}`}
                          className="admin-btn admin-btn--ghost cursor-pointer"
                        >
                          View
                        </Link>
                        {canRevise ? (
                          <Link
                            href={`/admin/quotations/new?requestId=${qt.request.id}`}
                            className="admin-btn admin-btn--secondary cursor-pointer"
                          >
                            Quote
                          </Link>
                        ) : (
                          <AdminActionButton
                            disabledReason={quoteDisabledReason(qt)}
                          >
                            Quote
                          </AdminActionButton>
                        )}
                        {canAssign ? (
                          <Link
                            href={`/admin/calendar?requestId=${qt.request.id}`}
                            className="admin-btn admin-btn--secondary cursor-pointer"
                          >
                            Assign
                          </Link>
                        ) : (
                          <AdminActionButton
                            disabledReason={assignDisabledReason(qt)}
                          >
                            Assign
                          </AdminActionButton>
                        )}
                        {pending && (
                          <>
                            <AdminActionButton
                              variant="primary"
                              onClick={() => onApproveCounteroffer?.(pending.id)}
                            >
                              Approve
                            </AdminActionButton>
                            <AdminActionButton
                              variant="danger"
                              onClick={() => onRejectCounteroffer?.(pending.id)}
                            >
                              Reject
                            </AdminActionButton>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
