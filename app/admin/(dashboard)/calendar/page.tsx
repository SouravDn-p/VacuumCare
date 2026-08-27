import { Suspense } from "react";
import type { Metadata } from "next";
import CalendarDashboard from "@/components/admin/calendar/CalendarDashboard";

export const metadata: Metadata = {
  title: "Calendar & Scheduling",
  description: "View and manage upcoming service appointments on the admin calendar.",
};

export default function CalendarPage() {
  return (
    <Suspense>
      <CalendarDashboard />
    </Suspense>
  );
}
