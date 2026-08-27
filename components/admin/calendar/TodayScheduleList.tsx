import { ADMIN_TIMEZONE, formatTodayHeading } from "./calendarData";
import type { AdminScheduleItem } from "@/types/admin/schedule";

interface TodayScheduleListProps {
  date: Date;
  items: AdminScheduleItem[];
  timeZone?: string;
}

function formatTime(iso: string, timeZone = ADMIN_TIMEZONE) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
}

function statusLabel(status: AdminScheduleItem["status"]) {
  switch (status) {
    case "IN_PROGRESS":
      return "In Progress";
    case "REPORT_SUBMITTED":
      return "Report submitted";
    case "COMPLETED":
      return "Completed";
    default:
      return "Scheduled";
  }
}

export default function TodayScheduleList({
  date,
  items,
  timeZone = ADMIN_TIMEZONE,
}: TodayScheduleListProps) {
  return (
    <section className="cal-today" aria-label="Today's schedule">
      <h2 className="cal-today__heading">
        <span className="cal-today__heading-today">Today</span>
        &nbsp;&nbsp;{formatTodayHeading(date)}
      </h2>

      <ul className="cal-today__list">
        {items.length === 0 ? (
          <li className="cal-today__row">
            <span className="cal-today__time">—</span>
            <div className="cal-today__info">
              <span className="cal-today__customer">No appointments today</span>
              <span className="cal-today__detail">
                Accepted and authorized requests can be scheduled from this page.
              </span>
            </div>
          </li>
        ) : (
          items.map((item) => {
            const technician = item.technician
              ? `${item.technician.firstName} ${item.technician.lastName}`.trim()
              : "Unassigned";

            return (
              <li key={item.id} className="cal-today__row">
                <span className="cal-today__time">
                  {formatTime(item.scheduledStart, timeZone)}
                </span>
                <div className="cal-today__info">
                  <span className="cal-today__customer">
                    {item.customer.firstName} {item.customer.lastName}
                  </span>
                  <span className="cal-today__detail">
                    {item.category.name} · {technician}
                  </span>
                </div>
                <div className="cal-today__meta">
                  <span className="cal-today__sr-id">{item.requestNumber}</span>
                  <span className="cal-badge cal-badge--in-progress">
                    {statusLabel(item.status)}
                  </span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
