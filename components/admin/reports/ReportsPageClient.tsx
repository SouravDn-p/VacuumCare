"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import RevenueOverview from "@/components/admin/RevenueOverview";
import ServiceDistribution from "@/components/admin/ServiceDistribution";
import MiniBarCard from "@/components/admin/reports/MiniBarCard";
import { useGetAdminTechniciansQuery } from "@/redux/features/api/admin/techniciansApi";
import {
  downloadAdminReport,
  useGetAdminReportsOverviewQuery,
  type AdminReportTrend,
} from "@/redux/features/api/admin/reportsApi";

function isoDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function trendBadge(trend?: AdminReportTrend) {
  if (!trend) return undefined;
  const sign = trend.deltaPercent >= 0 ? "+" : "";
  return {
    badge: `${sign}${trend.deltaPercent.toFixed(0)}%`,
    badgeType: trend.deltaPercent >= 0 ? "positive" : "negative",
  } as const;
}

export default function ReportsPageClient() {
  const [from, setFrom] = useState(isoDaysAgo(180));
  const [to, setTo] = useState(isoDaysAgo(0));
  const [technicianId, setTechnicianId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const query = useMemo(
    () => ({
      from,
      to,
      technicianId: technicianId || undefined,
      categoryId: categoryId || undefined,
      paymentStatus: paymentStatus || undefined,
    }),
    [categoryId, from, paymentStatus, technicianId, to],
  );

  const { data } = useGetAdminReportsOverviewQuery(query);
  const { data: technicians } = useGetAdminTechniciansQuery({ pageSize: 50 });

  const monthly = data?.monthlyOrders.map((point) => point.value) ?? [0, 0, 0, 0, 0];
  const miniCards = [
    {
      title: "Monthly orders",
      value: String(data?.store.orders ?? 0),
      change: `${trendBadge(data?.trends.storeNetRevenue)?.badge ?? "0%"} vs last period`,
      data: monthly.slice(-5).concat(Array(5).fill(0)).slice(0, 5),
    },
    {
      title: "Avg. quote accepted",
      value: `${Math.round(data?.averageQuoteAcceptance ?? 0)}%`,
      change: `${trendBadge(data?.trends.averageQuoteAcceptance)?.badge ?? "0%"} vs last period`,
      data: monthly.slice(-5).concat(Array(5).fill(0)).slice(0, 5),
    },
    {
      title: "Avg. service value",
      value: money(data?.averageServiceValue ?? 0),
      change: `${trendBadge(data?.trends.averageServiceValue)?.badge ?? "0%"} vs last period`,
      data: monthly.slice(-5).concat(Array(5).fill(0)).slice(0, 5),
    },
    {
      title: "Technician utilization",
      value: `${Math.round(data?.technicianUtilization ?? 0)}%`,
      change: `${trendBadge(data?.trends.technicianUtilization)?.badge ?? "0%"} vs last period`,
      data: monthly.slice(-5).concat(Array(5).fill(0)).slice(0, 5),
    },
  ];

  const storeRows = [
    {
      label: "Total sales",
      value: money(data?.store.grossRevenue ?? 0),
      ...trendBadge(data?.trends.storeNetRevenue),
    },
    { label: "Orders by date", value: String(data?.store.orders ?? 0) },
    { label: "Average order value", value: money(data?.store.averageOrderValue ?? 0) },
    { label: "Return & refund totals", value: money(data?.store.refunds ?? 0) },
    { label: "Net store revenue", value: money(data?.store.netRevenue ?? 0) },
  ];

  const serviceRows = [
    { label: "Total service requests", value: String(data?.services.requests ?? 0) },
    { label: "Accepted quotations", value: String(data?.services.acceptedQuotes ?? 0) },
    {
      label: "Service revenue",
      value: money(data?.services.serviceRevenue ?? 0),
      ...trendBadge(data?.trends.serviceRevenue),
    },
    { label: "Average service value", value: money(data?.services.averageServiceValue ?? 0) },
    { label: "Completed services", value: String(data?.services.completed ?? 0) },
  ];

  const exportReport = async (kind: "csv" | "pdf") => {
    try {
      await downloadAdminReport(kind, query);
    } catch {
      toast.error("Could not export this report.");
    }
  };

  return (
    <>
      <ReportsHeader onExportPdf={() => void exportReport("pdf")} onExportCsv={() => void exportReport("csv")} />
      <div className="rpt-filters">
        <div className="rpt-filters__dates">
          <div className="rpt-date-field">
            <label htmlFor="rpt-from" className="rpt-date-field__label">From</label>
            <input id="rpt-from" type="date" className="rpt-date-input" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="rpt-date-separator" aria-hidden="true" />
          <div className="rpt-date-field">
            <label htmlFor="rpt-to" className="rpt-date-field__label">To</label>
            <input id="rpt-to" type="date" className="rpt-date-input" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
        <div className="rpt-filters__dropdowns">
          <div className="rpt-dropdown">
            <select id="rpt-filter-tech" className="rpt-dropdown__select" value={technicianId} onChange={(e) => setTechnicianId(e.target.value)} aria-label="Filter by technician">
              <option value="">All Technicians</option>
              {(technicians?.items ?? []).map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.firstName} {tech.lastName}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
          </div>
          <div className="rpt-dropdown">
            <select id="rpt-filter-category" className="rpt-dropdown__select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} aria-label="Filter by service category">
              <option value="">All Service Categories</option>
            </select>
            <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
          </div>
          <div className="rpt-dropdown">
            <select id="rpt-filter-payment" className="rpt-dropdown__select" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} aria-label="Filter by payment status">
              <option value="">All Payment Statuses</option>
              <option value="SUCCEEDED">Succeeded</option>
              <option value="CAPTURED">Captured</option>
              <option value="AUTHORIZED">Authorized</option>
              <option value="PENDING">Pending</option>
            </select>
            <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="rpt-charts-row">
        <RevenueOverview
          points={data?.revenueSeries.map((point) => ({
            period: point.period,
            revenue: point.value,
          }))}
        />
        <ServiceDistribution
          total={data?.serviceDistribution.reduce((sum, item) => sum + item.count, 0)}
          items={data?.serviceDistribution}
        />
      </div>

      <div className="rpt-mini-grid">
        {miniCards.map((card) => (
          <MiniBarCard key={card.title} title={card.title} value={card.value} change={card.change} data={card.data} />
        ))}
      </div>

      <div className="rpt-tables-row">
        <ReportTable title="Store Reports" rows={storeRows} onExport={() => void exportReport("csv")} />
        <ReportTable title="Service Reports" rows={serviceRows} onExport={() => void exportReport("csv")} />
      </div>
    </>
  );
}

function ReportTable({
  title,
  rows,
  onExport,
}: {
  title: string;
  onExport: () => void;
  rows: { label: string; value: string; badge?: string; badgeType?: "positive" | "negative" }[];
}) {
  return (
    <div className="rpt-table-card">
      <div className="rpt-table-card__header">
        <h2 className="rpt-table-card__title">{title}</h2>
        <button className="rpt-table-card__export" onClick={onExport} aria-label={`Export ${title}`}>
          Export
        </button>
      </div>
      <ul className="rpt-table-card__list" aria-label={`${title} metrics`}>
        {rows.map((row) => (
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
