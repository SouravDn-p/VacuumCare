"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

const formatYAxis = (value: number) => {
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value}`;
};

const formatTooltip = (value: unknown) =>
  [`$${Number(value ?? 0).toLocaleString()}`, "Revenue"];

const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "1px solid #e2e2e2",
  fontSize: 13,
  fontFamily: "Arial",
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(period: string) {
  const month = Number(period.split("-")[1]);
  return MONTHS[(month || 1) - 1] ?? period;
}

interface Props {
  points?: { period: string; revenue: number }[];
}

export default function RevenueOverview({ points }: Props) {
  const data =
    points?.map((point) => ({
      month: monthLabel(point.period),
      revenue: point.revenue,
    })) ?? [];

  return (
    <div className="admin-chart-panel">
      <h2 className="admin-chart-panel__title">Revenue Overview</h2>
      <div className="admin-chart-wrapper admin-chart-wrapper--no-border">
        {data.length === 0 ? (
          <p className="admin-empty-copy">No revenue data for this range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#e2e2e2"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666666", fontSize: 12, fontFamily: "Arial" }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666666", fontSize: 12, fontFamily: "Arial" }}
                tickFormatter={formatYAxis}
                width={44}
              />
              <Tooltip
                formatter={formatTooltip}
                contentStyle={TOOLTIP_STYLE}
                cursor={{ stroke: "#e2e2e2", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2e6162"
                strokeWidth={2}
                dot={<Dot r={4} fill="#ffffff" stroke="#2e6162" strokeWidth={2} />}
                activeDot={{ r: 5, fill: "#2e6162" }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
