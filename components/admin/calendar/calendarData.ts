export const ADMIN_TIMEZONE =
  typeof Intl === "undefined"
    ? "UTC"
    : Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

export interface CalEvent {
  id: string;
  ymd: string;
  timeSlot: number;
  timeLabel: string;
  customer: string;
  service: string;
  technician: string;
}

export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function startOfWeekMonday(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function toDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDayHeader(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");
}

export function formatTodayHeading(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function weekDates(anchor = new Date()) {
  const monday = startOfWeekMonday(anchor);
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

export function weekDayHeaders(anchor = new Date()) {
  return weekDates(anchor).map(formatDayHeader);
}

export function weekRange(anchor = new Date()) {
  const days = weekDates(anchor);
  return {
    from: toDateInput(days[0]),
    to: toDateInput(days[6]),
  };
}

export function monthRange(anchor = new Date()) {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  return {
    from: toDateInput(start),
    to: toDateInput(end),
  };
}

export function monthCells(anchor = new Date()) {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const lead = startOfWeekMonday(start);
  const trail = addDays(startOfWeekMonday(end), 6);
  const days: Date[] = [];
  for (let cursor = new Date(lead); cursor <= trail; cursor = addDays(cursor, 1)) {
    days.push(new Date(cursor));
  }
  return days;
}

export function dateKey(date: Date, timeZone = ADMIN_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month").padStart(2, "0")}-${value("day").padStart(2, "0")}`;
}

export function zonedDateParts(iso: string, timeZone = ADMIN_TIMEZONE) {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  let hour = Number(value("hour"));
  const period = value("dayPeriod").toLowerCase();
  if (period.includes("pm") && hour < 12) hour += 12;
  if (period.includes("am") && hour === 12) hour = 0;

  return {
    ymd: dateKey(date, timeZone),
    hour,
    minute: Number(value("minute")),
    weekday: value("weekday"),
  };
}

export function hourToSlot(hour: number) {
  if (hour < 8) return 0;
  if (hour > 17) return TIME_SLOTS.length - 1;
  return hour - 8;
}

export function formatEventTime(iso: string, timeZone = ADMIN_TIMEZONE) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
}

export const DURATION_OPTIONS = [
  { label: "30 minutes", minutes: 30 },
  { label: "1 hour", minutes: 60 },
  { label: "1.5 hours", minutes: 90 },
  { label: "2 hours", minutes: 120 },
  { label: "2.5 hours", minutes: 150 },
  { label: "3 hours", minutes: 180 },
  { label: "4 hours", minutes: 240 },
];
