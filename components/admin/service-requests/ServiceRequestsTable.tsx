"use client";

import { Fragment, useState } from "react";

import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { type ServiceRequestItem } from "./serviceRequestsData";

interface ServiceRequestsTableProps {
  items: ServiceRequestItem[];
  onQuote?: (item: ServiceRequestItem) => void;
  onAssign?: (item: ServiceRequestItem) => void;
}

function quoteDisabledReason(status: string) {
  switch (status) {
    case "Accepted":
      return "This request already has an accepted quotation.";
    case "Scheduled":
      return "This request is already scheduled, so a new quote cannot be sent.";
    case "In Progress":
      return "The technician is already on this visit, so a new quote cannot be sent.";
    case "Report Submitted":
      return "The technician has submitted a report, so a new quote cannot be sent.";
    case "Completed":
      return "This request is completed, so a quotation cannot be created.";
    case "Cancelled":
      return "This request was cancelled, so a quotation cannot be created.";
    default:
      return "A quotation cannot be created for this request in its current status.";
  }
}

function assignDisabledReason(status: string) {
  switch (status) {
    case "Scheduled":
      return "A technician is already assigned to this request.";
    case "In Progress":
      return "The technician has already started this visit.";
    case "Report Submitted":
      return "The visit report is with the office. Capture payment after review.";
    case "Completed":
      return "This request is completed, so a technician cannot be assigned.";
    case "Cancelled":
      return "This request was cancelled, so a technician cannot be assigned.";
    default:
      return "Assign is available after the customer accepts the quotation and payment is authorized.";
  }
}

function getBadgeClass(status: string) {
  switch (status) {
    case "New":
      return "sr-badge--new";
    case "Under Review":
      return "sr-badge--under-review";
    case "Scheduled":
      return "sr-badge--scheduled";
    case "In Progress":
      return "sr-badge--in-progress";
    case "Report Submitted":
      return "sr-badge--report-submitted";
    case "Accepted":
      return "sr-badge--accepted";
    case "Completed":
      return "sr-badge--completed";
    case "Cancelled":
      return "sr-badge--cancelled";
    default:
      return "sr-badge--default";
  }
}

export default function ServiceRequestsTable({
  items,
  onQuote,
  onAssign,
}: ServiceRequestsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="sr-table-card">
      <div className="sr-table-scroll">
        <table className="sr-table" aria-label="Service requests list">
          <thead>
            <tr>
              <th className="sr-table__th" scope="col">Request ID</th>
              <th className="sr-table__th" scope="col">Customer</th>
              <th className="sr-table__th" scope="col">Service</th>
              <th className="sr-table__th" scope="col">Submitted</th>
              <th className="sr-table__th" scope="col">Status</th>
              <th className="sr-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="sr-table__empty-cell">
                  <p className="sr-table__empty-text">No requests in this status.</p>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <Fragment key={item.id}>
                  <tr className="sr-table__tr">
                    {/* Request ID */}
                    <td className="sr-table__td sr-table__td--id">
                      <span className="sr-table__id-link">{item.requestId}</span>
                    </td>

                    {/* Customer */}
                    <td className="sr-table__td sr-table__td--customer">
                      <div className="sr-customer-cell">
                        <span className="sr-customer-cell__name">{item.customerName}</span>
                        <span className="sr-customer-cell__subtext">{item.customerSubtext}</span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="sr-table__td sr-table__td--service">
                      <span className="sr-table__service-text">{item.service}</span>
                    </td>

                    {/* Submitted */}
                    <td className="sr-table__td sr-table__td--submitted">
                      <span className="sr-table__submitted-text">{item.submitted}</span>
                    </td>

                    {/* Status */}
                    <td className="sr-table__td sr-table__td--status">
                      <span className={`sr-badge ${getBadgeClass(item.status)}`}>
                        {item.statusLabel}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="sr-table__td sr-table__td--action">
                      <div className="sr-actions-cell admin-btn-row">
                        <AdminActionButton
                          variant="ghost"
                          onClick={() =>
                            setExpandedId((current) =>
                              current === item.id ? null : item.id,
                            )
                          }
                        >
                          {expandedId === item.id ? "Hide" : "View"}
                        </AdminActionButton>
                        <AdminActionButton
                          variant="secondary"
                          disabledReason={
                            item.canQuote === false
                              ? quoteDisabledReason(item.status)
                              : undefined
                          }
                          onClick={() => onQuote?.(item)}
                        >
                          Quote
                        </AdminActionButton>
                        <AdminActionButton
                          variant="secondary"
                          disabledReason={
                            item.canAssign === false
                              ? assignDisabledReason(item.status)
                              : undefined
                          }
                          onClick={() => onAssign?.(item)}
                        >
                          Assign
                        </AdminActionButton>
                      </div>
                    </td>
                  </tr>

                  {expandedId === item.id && (
                    <tr key={`${item.id}-details`} className="sr-table__tr">
                      <td colSpan={6} className="sr-table__td">
                        <div className="sr-customer-cell">
                          <span className="sr-customer-cell__name">
                            Request {item.requestId} · {item.customerName}
                          </span>
                          <span className="sr-customer-cell__subtext">
                            {item.service} — submitted {item.submitted}. Current
                            status: {item.statusLabel}.
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
