import type { Metadata } from "next";
import DashboardOverview from "@/components/admin/DashboardOverview";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description:
    "Elite admin portal – dashboard overview showing key metrics, service requests, revenue, and orders.",
};

export default function AdminDashboardPage() {
  return <DashboardOverview />;
}
