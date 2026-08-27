"use client";

import { Plus } from "lucide-react";
import ScheduleServiceModal from "./ScheduleServiceModal";
import { CALENDAR_VIEWS, type CalendarViewMode } from "./calendarData";

interface CalendarHeaderProps {
  activeView: CalendarViewMode;
  onViewChange: (view: CalendarViewMode) => void;
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  initialRequestId?: string;
  initialTechnicianId?: string;
}

export default function CalendarHeader({
  activeView,
  onViewChange,
  modalOpen,
  onOpenModal,
  onCloseModal,
  initialRequestId,
  initialTechnicianId,
}: CalendarHeaderProps) {
  return (
    <>
      <div className="cal-header">
        <div className="cal-header__title-wrap">
          <h1 className="cal-header__title">Service calendar</h1>
          <p className="cal-header__subtitle">Schedule and manage upcoming services</p>
        </div>

        <div className="cal-header__controls">
          <div className="cal-view-tabs" role="tablist" aria-label="Calendar view">
            {CALENDAR_VIEWS.map((view) => (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={activeView === view.id}
                className={`cal-view-tab${activeView === view.id ? " cal-view-tab--active" : ""}`}
                onClick={() => onViewChange(view.id)}
              >
                {view.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            id="cal-schedule-btn"
            className="cal-schedule-btn"
            aria-label="Schedule a new service"
            onClick={onOpenModal}
          >
            <Plus size={20} strokeWidth={2} className="cal-schedule-btn__icon" />
            <span className="cal-schedule-btn__text">Schedule service</span>
          </button>
        </div>
      </div>

      <ScheduleServiceModal
        isOpen={modalOpen}
        onClose={onCloseModal}
        initialRequestId={initialRequestId}
        initialTechnicianId={initialTechnicianId}
      />
    </>
  );
}
