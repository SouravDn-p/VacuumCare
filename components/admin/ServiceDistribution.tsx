"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SEGMENT_STYLES = [
  { cssClass: "admin-donut-segment--low-suction", legendClass: "admin-donut-legend-item--low-suction", color: "#0d9488" },
  { cssClass: "admin-donut-segment--blockage", legendClass: "admin-donut-legend-item--blockage", color: "#0ea5e9" },
  { cssClass: "admin-donut-segment--inlet", legendClass: "admin-donut-legend-item--inlet", color: "#8b5cf6" },
  { cssClass: "admin-donut-segment--maintenance", legendClass: "admin-donut-legend-item--maintenance", color: "#f59e0b" },
  { cssClass: "admin-donut-segment--motor", legendClass: "admin-donut-legend-item--motor", color: "#f97316" },
  { cssClass: "admin-donut-segment--others", legendClass: "admin-donut-legend-item--others", color: "#94a3b8" },
];

interface Props {
  total?: number;
  items?: { name: string; count: number; percentage: number }[];
}

export default function ServiceDistribution({ total = 0, items = [] }: Props) {
  const data = items.map((item, index) => {
    const style = SEGMENT_STYLES[index % SEGMENT_STYLES.length];
    return {
      name: `${item.name} ${Math.round(item.percentage)}%`,
      value: item.count || item.percentage,
      cssClass: style.cssClass,
      legendClass: style.legendClass,
      color: style.color,
    };
  });

  return (
    <div className="admin-chart-panel">
      <h2 className="admin-chart-panel__title">Service Distribution</h2>
      <div className="admin-donut-container">
        <div className="admin-donut-chart-wrap">
          {data.length === 0 ? (
            <p className="admin-empty-copy">No service data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                  stroke="#6b7280"
                  strokeWidth={0.5}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="admin-donut-center-overlay">
            <p className="admin-donut-center-num">{total}</p>
            <p className="admin-donut-center-text">Requests</p>
          </div>
        </div>
        <ul className="admin-donut-legend" aria-label="Service distribution legend">
          {data.map((item) => (
            <li key={item.name} className={`admin-donut-legend-item ${item.legendClass}`}>
              <span className="admin-donut-legend-dot" aria-hidden="true" />
              <span className="admin-donut-legend-label">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
