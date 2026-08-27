/* -----------------------------------------------------------------------
   Each row: label | badge | value
   badge: positive = green (#009966), negative = red (#FB2C36)
   value numbers use DM Mono font
----------------------------------------------------------------------- */

interface ReportRow {
  label: string;
  badge?: string;
  badgeType?: "positive" | "negative";
  value: string;
}

const ROWS: ReportRow[] = [
  { label: "Total sales", badge: "+12%", badgeType: "positive", value: "$12,840" },
  { label: "Orders by date", badge: "+5%", badgeType: "positive", value: "47" },
  { label: "Tax collected", badge: "+12%", badgeType: "positive", value: "$1,326" },
  { label: "Shipping totals", badge: "+8%", badgeType: "positive", value: "$940" },
  { label: "Product performance", value: "–" },
  { label: "Return & refund totals", badge: "-2%", badgeType: "negative", value: "$349" },
];

export default function StoreReportsCard() {
  return (
    <div className="rpt-table-card">
      {/* Header */}
      <div className="rpt-table-card__header">
        <h2 className="rpt-table-card__title">Store Reports</h2>
        <button className="rpt-table-card__export" aria-label="Export store reports">
          Export
        </button>
      </div>

      {/* Rows */}
      <ul className="rpt-table-card__list" aria-label="Store report metrics">
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
