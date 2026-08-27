"use client";

import Link from "next/link";
import type { AdminDashboardScheduleItem } from "@/redux/features/api/admin/dashboardApi";

const STATUS_CLASS: Record<string, string> = {
  IN_PROGRESS: "admin-badge--in-progress",
  REPORT_SUBMITTED: "admin-badge--report-submitted",
  SCHEDULED: "admin-badge--scheduled",
  ACCEPTED: "admin-badge--scheduled",
};

export default function TodaysSchedule({
  items = [],
}: {
  items?: AdminDashboardScheduleItem[];
}) {
  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2 className="admin-panel__title">Today&apos;s Schedule</h2>
        <Link href="/admin/calendar" className="admin-panel__link">
          Open Calendar
        </Link>
      </div>
      <table className="admin-schedule-table" aria-label="Today's schedule">
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={3}>No jobs scheduled today.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="admin-schedule-time">
                    {new Date(item.scheduledStart).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
                <td>
                  <span className="admin-schedule-name">{item.customerName}</span>
                  <span className="admin-schedule-detail">
                    {item.serviceName}
                    {item.technicianName ? ` · ${item.technicianName}` : ""}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge ${STATUS_CLASS[item.status] || "admin-badge--scheduled"}`}>
                    {item.status.replaceAll("_", " ").toLowerCase()}
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
