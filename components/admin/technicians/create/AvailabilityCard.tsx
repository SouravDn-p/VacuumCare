import { Clock } from "lucide-react";

interface AvailabilityCardProps {
  availableDays: string[];
  onToggleDay: (day: string) => void;
  startTime: string;
  onStartTimeChange: (val: string) => void;
  endTime: string;
  onEndTimeChange: (val: string) => void;
}

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AvailabilityCard({
  availableDays,
  onToggleDay,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
}: AvailabilityCardProps) {
  return (
    <div className="at-card">
      <h2 className="at-card__title">Availability</h2>

      {/* Weekday Toggle Pills */}
      <div className="at-days-row">
        {DAYS_OF_WEEK.map((day) => {
          const isActive = availableDays.includes(day);
          return (
            <button
              type="button"
              key={day}
              className={`at-day-pill${isActive ? " at-day-pill--active" : ""}`}
              onClick={() => onToggleDay(day)}
              aria-pressed={isActive}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Working Hours Time Inputs */}
      <div className="at-form-grid">
        <div className="at-field-group">
          <label htmlFor="at-start-time" className="at-field-label">
            Start time
          </label>
          <div className="at-time-input-wrap">
            <input
              type="text"
              id="at-start-time"
              className="at-input at-input--time"
              placeholder="08:00 AM"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
            />
            <Clock size={16} className="at-time-icon" aria-hidden="true" />
          </div>
        </div>

        <div className="at-field-group">
          <label htmlFor="at-end-time" className="at-field-label">
            End time
          </label>
          <div className="at-time-input-wrap">
            <input
              type="text"
              id="at-end-time"
              className="at-input at-input--time"
              placeholder="05:00 PM"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
            />
            <Clock size={16} className="at-time-icon" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
