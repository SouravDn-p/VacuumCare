"use client";

import type { CalendarViewMode } from "./CalendarHeader";
import {
  ADMIN_TIMEZONE,
  TIME_SLOTS,
  WEEKDAY_NAMES,
  dateKey,
  formatDayHeader,
  monthCells,
  weekDates,
  type CalEvent,
} from "./calendarData";

interface CalendarViewProps {
  view: CalendarViewMode;
  anchor: Date;
  events: CalEvent[];
  timeZone?: string;
}

function EventCard({ evt, compact = false }: { evt: CalEvent; compact?: boolean }) {
  return (
    <div className={`cal-event-card${compact ? " cal-event-card--compact" : ""}`}>
      <span className="cal-event-card__customer">{evt.customer}</span>
      <span className="cal-event-card__service">
        {evt.timeLabel} · {evt.service}
      </span>
      {!compact && (
        <span className="cal-event-card__tech">{evt.technician}</span>
      )}
    </div>
  );
}

function TimeGrid({
  days,
  events,
  label,
  timeZone,
}: {
  days: Date[];
  events: CalEvent[];
  label: string;
  timeZone: string;
}) {
  const dayKeys = days.map((day) => dateKey(day, timeZone));

  return (
    <div className="cal-grid-wrap">
      <div className="cal-grid-scroll">
        <table
          className={`cal-grid${days.length === 1 ? " cal-grid--day" : ""}`}
          aria-label={label}
        >
          <thead>
            <tr>
              <th className="cal-grid__time-head" scope="col">
                Time
              </th>
              {days.map((day) => (
                <th key={dateKey(day, timeZone)} className="cal-grid__day-head" scope="col">
                  {formatDayHeader(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot, slotIdx) => (
              <tr key={slot} className="cal-grid__row">
                <td className="cal-grid__time-cell">{slot}</td>
                {dayKeys.map((ymd) => {
                  const cellEvents = events.filter(
                    (evt) => evt.ymd === ymd && evt.timeSlot === slotIdx,
                  );
                  return (
                    <td key={`${ymd}-${slotIdx}`} className="cal-grid__day-cell">
                      {cellEvents.map((evt) => (
                        <EventCard key={evt.id} evt={evt} />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthGrid({
  anchor,
  events,
  timeZone,
}: {
  anchor: Date;
  events: CalEvent[];
  timeZone: string;
}) {
  const cells = monthCells(anchor);
  const currentMonth = anchor.getMonth();

  return (
    <div className="cal-grid-wrap">
      <div className="cal-grid-scroll">
        <div className="cal-month" aria-label="Monthly service calendar">
          {WEEKDAY_NAMES.map((name) => (
            <div key={name} className="cal-month__head">
              {name}
            </div>
          ))}
          {cells.map((day, index) => {
            const ymd = dateKey(day, timeZone);
            const dayEvents = events.filter((evt) => evt.ymd === ymd);
            const muted = day.getMonth() !== currentMonth;
            return (
              <div
                key={`${ymd}-${index}`}
                className={`cal-month__cell${muted ? " cal-month__cell--muted" : ""}`}
              >
                <span className="cal-month__date">{day.getDate()}</span>
                <div className="cal-month__events">
                  {dayEvents.map((evt) => (
                    <EventCard key={evt.id} evt={evt} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CalendarView({
  view,
  anchor,
  events,
  timeZone = ADMIN_TIMEZONE,
}: CalendarViewProps) {
  if (view === "Month") {
    return <MonthGrid anchor={anchor} events={events} timeZone={timeZone} />;
  }

  if (view === "Day") {
    return (
      <TimeGrid
        days={[anchor]}
        events={events}
        label="Daily service calendar"
        timeZone={timeZone}
      />
    );
  }

  return (
    <TimeGrid
      days={weekDates(anchor)}
      events={events}
      label="Weekly service calendar"
      timeZone={timeZone}
    />
  );
}
