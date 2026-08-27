"use client";

import Link from "next/link";
import type { AdminRecentServiceRequest } from "@/redux/features/api/admin/dashboardApi";

const STATUS_CLASS: Record<string, string> = {
  NEW: "admin-badge--new-request",
  UNDER_REVIEW: "admin-badge--under-review",
  QUOTE_SENT: "admin-badge--quote-ready",
  ACCEPTED: "admin-badge--scheduled",
  SCHEDULED: "admin-badge--scheduled",
  IN_PROGRESS: "admin-badge--in-progress",
  REPORT_SUBMITTED: "admin-badge--report-submitted",
  COMPLETED: "admin-badge--shipped",
  CANCELLED: "admin-badge--pending",
};

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export default function RecentServiceRequests({
  requests = [],
}: {
  requests?: AdminRecentServiceRequest[];
}) {
  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2 className="admin-panel__title">Recent Service Requests</h2>
        <Link href="/admin/service-requests" className="admin-panel__link">
          View all
        </Link>
      </div>
      <table className="admin-sr-table" aria-label="Recent service requests">
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={4}>No recent service requests.</td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id}>
                <td>
                  <span className="admin-sr-id">{req.requestNumber}</span>
                </td>
                <td>
                  <span className="admin-sr-name">{req.customerName}</span>
                  <span className="admin-sr-desc">
                    {req.issueName || req.serviceName}
                  </span>
                </td>
                <td>
                  <span className="admin-sr-date">
                    {new Date(req.createdAt).toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge ${STATUS_CLASS[req.status] || "admin-badge--pending"}`}>
                    {formatStatus(req.status)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
