"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May"];

/* Last bar gets the slightly darker blue from Figma (#87ABFD vs #A8C3FF) */
const BAR_COLOR_DEFAULT = "#A8C3FF";
const BAR_COLOR_LAST = "#87ABFD";

interface MiniBarCardProps {
  title: string;
  value: string;
  change: string;
  /** Array of 5 relative values — Jan → May */
  data: number[];
}

export default function MiniBarCard({ title, value, change, data }: MiniBarCardProps) {
  const chartData = MONTHS.map((month, i) => ({ month, value: data[i] }));

  return (
    <div className="rpt-mini-card">
      <p className="rpt-mini-card__title">{title}</p>

      {/* Bar chart */}
      <div className="rpt-mini-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barSize={40}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "Inter" }}
              dy={4}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === chartData.length - 1 ? BAR_COLOR_LAST : BAR_COLOR_DEFAULT}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Value + change */}
      <p className="rpt-mini-card__value">{value}</p>
      <p className="rpt-mini-card__change">{change}</p>
    </div>
  );
}
