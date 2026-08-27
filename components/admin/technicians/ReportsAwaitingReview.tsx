import { AWAITING_REPORTS, type ReportAwaitingReview } from "./techniciansData";

export default function ReportsAwaitingReview({
  reports = AWAITING_REPORTS,
  onReview,
}: {
  reports?: ReportAwaitingReview[];
  onReview?: (id: string) => void;
}) {
  return (
    <div className="tech-reports-panel">
      <div className="tech-reports-panel__header">
        <h2 className="tech-reports-panel__title">Reports Awaiting Review</h2>
      </div>

      <div className="tech-reports-panel__content">
        {reports.map((report) => (
          <div key={report.id} className="tech-report-row">
            <div className="tech-report-row__user">
              <div className="tech-report-row__avatar" aria-hidden="true">
                <span className="tech-report-row__avatar-text">{report.initials}</span>
              </div>
              <div className="tech-report-row__info">
                <p className="tech-report-row__name">{report.name}</p>
                <p className="tech-report-row__role">{report.role}</p>
              </div>
            </div>

            <div className="tech-report-row__actions">
              <button
                type="button"
                className="tech-report-btn tech-report-btn--submitted"
              >
                {report.reportStatus}
              </button>
              <button
                type="button"
                className="tech-report-btn tech-report-btn--review"
                onClick={() => onReview?.(report.id)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
