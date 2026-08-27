"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";
import TodayScheduleList from "./TodayScheduleList";
import {
  ADMIN_TIMEZONE,
  dateKey,
  formatEventTime,
  hourToSlot,
  monthGridRange,
  weekRange,
  zonedDateParts,
  type CalendarViewMode,
  type CalEvent,
} from "./calendarData";
import { useGetAdminScheduleQuery } from "@/redux/features/api/admin/scheduleApi";
import type { AdminScheduleItem } from "@/types/admin/schedule";

function personName(person: { firstName: string; lastName: string } | null) {
  if (!person) return "Unassigned";
  return `${person.firstName} ${person.lastName}`.trim();
}

export default function CalendarDashboard() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") ?? "";
  const technicianId = searchParams.get("technicianId") ?? "";

  const [modalOpen, setModalOpen] = useState(Boolean(requestId));
  const [view, setView] = useState<CalendarViewMode>("Week");
  const [timeZone, setTimeZone] = useState(ADMIN_TIMEZONE);
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    if (requestId) setModalOpen(true);
  }, [requestId]);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const range = useMemo(
    () => (view === "Month" ? monthGridRange(today) : weekRange(today)),
    [today, view],
  );

  const { data = [] } = useGetAdminScheduleQuery({
    from: range.from,
    to: range.to,
    timezone: timeZone,
    technicianId: technicianId || undefined,
  });

  const events = useMemo(
    () => toCalendarEvents(data, timeZone),
    [data, timeZone],
  );

  const todayItems = useMemo(() => {
    const todayKey = dateKey(today, timeZone);
    return data.filter(
      (item) => zonedDateParts(item.scheduledStart, timeZone).ymd === todayKey,
    );
  }, [data, timeZone, today]);

  return (
    <>
      <CalendarHeader
        activeView={view}
        onViewChange={setView}
        modalOpen={modalOpen}
        onOpenModal={() => setModalOpen(true)}
        onCloseModal={() => setModalOpen(false)}
        initialRequestId={requestId}
        initialTechnicianId={technicianId}
      />
      <CalendarView
        view={view}
        anchor={today}
        events={events}
        timeZone={timeZone}
      />
      <TodayScheduleList date={today} items={todayItems} timeZone={timeZone} />
    </>
  );
}

function toCalendarEvents(
  items: AdminScheduleItem[],
  timeZone: string,
): CalEvent[] {
  return items.map((item) => {
    const parts = zonedDateParts(item.scheduledStart, timeZone);
    return {
      id: item.id,
      ymd: parts.ymd,
      timeSlot: hourToSlot(parts.hour),
      timeLabel: formatEventTime(item.scheduledStart, timeZone),
      customer: personName(item.customer),
      service: item.category.name,
      technician: personName(item.technician),
    };
  });
}
