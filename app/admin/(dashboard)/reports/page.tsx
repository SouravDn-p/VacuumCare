import type { Metadata } from "next";
import ReportsPageClient from "@/components/admin/reports/ReportsPageClient";

export const metadata: Metadata = {
  title: "Reports",
  description: "Analyze business performance and trends across services, revenue, and orders.",
};

export default function ReportsPage() {
  return <ReportsPageClient />;
}
