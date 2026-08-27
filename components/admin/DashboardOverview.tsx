"use client";

import StatCard from "@/components/admin/StatCard";
import RecentServiceRequests from "@/components/admin/RecentServiceRequests";
import TodaysSchedule from "@/components/admin/TodaysSchedule";
import RevenueOverview from "@/components/admin/RevenueOverview";
import ServiceDistribution from "@/components/admin/ServiceDistribution";
import RecentStoreOrders from "@/components/admin/RecentStoreOrders";
import {
  useGetAdminDashboardRevenueQuery,
  useGetAdminDashboardScheduleQuery,
  useGetAdminDashboardSummaryQuery,
  useGetAdminRecentOrdersQuery,
  useGetAdminRecentServiceRequestsQuery,
  useGetAdminServiceDistributionQuery,
} from "@/redux/features/api/admin/dashboardApi";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function DashboardOverview() {
  const { data: summary } = useGetAdminDashboardSummaryQuery();
  const { data: requests = [] } = useGetAdminRecentServiceRequestsQuery();
  const { data: schedule = [] } = useGetAdminDashboardScheduleQuery();
  const { data: revenue } = useGetAdminDashboardRevenueQuery();
  const { data: distribution } = useGetAdminServiceDistributionQuery();
  const { data: orders = [] } = useGetAdminRecentOrdersQuery();

  const stats = [
    {
      value: pad(summary?.newServiceRequests ?? 0),
      label: "New service requests",
      colorClass: "admin-stat-card__value--blue",
    },
    {
      value: pad(summary?.quotationsAwaitingResponse ?? 0),
      label: "Quotations awaiting response",
      colorClass: "admin-stat-card__value--purple",
    },
    {
      value: pad(summary?.servicesScheduledToday ?? 0),
      label: "Services scheduled today",
      colorClass: "admin-stat-card__value--cyan",
    },
    {
      value: pad(summary?.servicesInProgress ?? 0),
      label: "Services in progress",
      colorClass: "admin-stat-card__value--orange",
    },
    {
      value: pad(summary?.reportsAwaitingReview ?? 0),
      label: "Reports awaiting review",
      colorClass: "admin-stat-card__value--purple",
    },
    {
      value: money(summary?.monthlyServiceRevenue ?? 0),
      label: "Monthly service revenue",
      colorClass: "admin-stat-card__value--teal",
    },
    {
      value: pad(summary?.ordersAwaitingShipment ?? 0),
      label: "Orders awaiting shipment",
      colorClass: "admin-stat-card__value--orange",
    },
    {
      value: pad(summary?.paymentIssues ?? 0),
      label: "Payment issues to review",
      colorClass: "admin-stat-card__value--red",
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-subtitle">
          Welcome back, here&apos;s what&apos;s happening today
        </p>
      </div>
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            colorClass={stat.colorClass}
          />
        ))}
      </div>
      <h2 className="admin-section-title">Technician capacity today</h2>
      <div className="admin-stats-grid">
        <StatCard
          value={pad(summary?.totalTechnicians ?? 0)}
          label="Total technicians"
          colorClass="admin-stat-card__value--blue"
        />
        <StatCard
          value={pad(summary?.techniciansFreeToday ?? 0)}
          label="Free technicians today"
          colorClass="admin-stat-card__value--teal"
        />
        <StatCard
          value={pad(summary?.techniciansOnAssignmentToday ?? 0)}
          label="Technicians on assignment"
          colorClass="admin-stat-card__value--orange"
        />
      </div>
      <div className="admin-panel-row">
        <RecentServiceRequests requests={requests} />
        <TodaysSchedule items={schedule} />
      </div>
      <div className="admin-charts-row">
        <RevenueOverview points={revenue?.items} />
        <ServiceDistribution
          total={distribution?.total}
          items={distribution?.items}
        />
      </div>
      <RecentStoreOrders orders={orders} />
    </>
  );
}
