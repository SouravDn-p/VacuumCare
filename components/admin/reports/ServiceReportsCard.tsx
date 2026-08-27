interface ReportRow {
  label: string;
  badge?: string;
  badgeType?: "positive" | "negative";
  value: string;
}

const ROWS: ReportRow[] = [
  { label: "Total service requests", badge: "+12%", badgeType: "positive", value: "$12,840" },
  { label: "Accepted quotations", badge: "+5%", badgeType: "positive", value: "47" },
  { label: "Rejected quotations", badge: "-12%", badgeType: "negative", value: "$1,326" },
  { label: "Expired quotations", badge: "+8%", badgeType: "positive", value: "$940" },
  { label: "Service revenue", value: "–" },
  { label: "Technician performance", badge: "-2%", badgeType: "negative", value: "$349" },
  { label: "Completion rate", badge: "-2%", badgeType: "negative", value: "$349" },
  { label: "Return-visit rate", badge: "-2%", badgeType: "negative", value: "$349" },
];

export default function ServiceReportsCard() {
  return (
    <div className="rpt-table-card">
      {/* Header */}
      <div className="rpt-table-card__header">
        <h2 className="rpt-table-card__title">Service Reports</h2>
        <button className="rpt-table-card__export" aria-label="Export service reports">
          Export
        </button>
      </div>

      {/* Rows */}
      <ul className="rpt-table-card__list" aria-label="Service report metrics">
        {ROWS.map((row) => (
          <li key={row.label} className="rpt-table-row">
            <div className="rpt-table-row__label-group">
              <span className="rpt-table-row__label">{row.label}</span>
              {row.badge && (
                <span
                  className={`rpt-table-row__badge${
                    row.badgeType === "negative"
                      ? " rpt-table-row__badge--negative"
                      : " rpt-table-row__badge--positive"
                  }`}
                >
                  {row.badge}
                </span>
              )}
            </div>
            <span className="rpt-table-row__value">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
