import { Star } from "lucide-react";
import { type Technician } from "./techniciansData";

interface TechnicianCardProps {
  technician: Technician;
  onViewSchedule?: (id: string) => void;
  onAssignJob?: (id: string) => void;
  onEdit?: (id: string) => void;
  onReviewReport?: (id: string) => void;
}

export default function TechnicianCard({
  technician,
  onViewSchedule,
  onAssignJob,
  onEdit,
  onReviewReport,
}: TechnicianCardProps) {
  return (
    <div className="tech-card">
      {/* ── Top Header: Avatar + Info + Rating ── */}
      <div className="tech-card__top">
        <div className="tech-card__avatar" aria-hidden="true">
          <span className="tech-card__avatar-text">{technician.initials}</span>
        </div>

        <div className="tech-card__identity">
          <h2 className="tech-card__name">{technician.name}</h2>
          <p className="tech-card__role">{technician.role}</p>
          <p className="tech-card__certs">{technician.certifications}</p>
        </div>

        <div className="tech-card__rating-badge">
          <Star size={11} className="tech-card__rating-star" fill="currentColor" />
          <span className="tech-card__rating-val">{technician.rating}</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="tech-card__divider" />

      {/* ── Body: Contact & Status ── */}
      <div className="tech-card__body">
        <p className="tech-card__contact-line">{technician.phone}</p>
        <p className="tech-card__contact-line">{technician.email}</p>
        <p className="tech-card__jobs-line">
          <span className="tech-card__jobs-label">Jobs today: </span>
          <span className="tech-card__jobs-count">{technician.jobsToday}</span>
        </p>
        <p className="tech-card__jobs-line">
          <span className="tech-card__jobs-label">In progress: </span>
          <span className="tech-card__jobs-count">{technician.jobsInProgress}</span>
        </p>

        <div className="tech-card__status-wrap">
          <span className="tech-badge tech-badge--service-call">
            {technician.status}
          </span>
        </div>
      </div>

      {/* ── Bottom Action Button Group ── */}
      <div className="tech-card__actions-group" role="group" aria-label="Technician actions">
        <button
          type="button"
          className="tech-action-btn tech-action-btn--active cursor-pointer"
          onClick={() => onViewSchedule?.(technician.id)}
        >
          View Schedule
        </button>
        <button
          type="button"
          className="tech-action-btn cursor-pointer"
          onClick={() => onAssignJob?.(technician.id)}
        >
          Assign Job
        </button>
        <button
          type="button"
          className="tech-action-btn cursor-pointer"
          onClick={() => onEdit?.(technician.id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="tech-action-btn cursor-pointer"
          onClick={() => onReviewReport?.(technician.id)}
        >
          Review Report
        </button>
      </div>
    </div>
  );
}
