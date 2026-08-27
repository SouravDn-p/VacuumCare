interface StatCardProps {
  value: string;
  label: string;
  /** CSS modifier class for the value color, e.g. "admin-stat-card__value--blue" */
  colorClass: string;
}

export default function StatCard({ value, label, colorClass }: StatCardProps) {
  return (
    <div className="admin-stat-card">
      <p className={`admin-stat-card__value ${colorClass}`}>{value}</p>
      <p className="admin-stat-card__label">{label}</p>
    </div>
  );
}
