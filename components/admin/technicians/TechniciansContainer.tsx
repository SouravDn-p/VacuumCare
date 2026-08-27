"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TechnicianCard from "./TechnicianCard";
import ReportsAwaitingReview from "./ReportsAwaitingReview";
import ScheduleServiceModal from "@/components/admin/calendar/ScheduleServiceModal";
import type { ReportAwaitingReview, Technician } from "./techniciansData";
import { useGetAdminTechniciansQuery } from "@/redux/features/api/admin/techniciansApi";
import type { AdminTechnicianItem } from "@/types/admin/technicians";

export default function TechniciansContainer() {
  const router = useRouter();
  const [assignTechnicianId, setAssignTechnicianId] = useState("");
  const { data, isLoading } = useGetAdminTechniciansQuery({
    page: 1,
    pageSize: 100,
    timezone: "America/Toronto",
  });

  const technicians = (data?.items ?? []).map(toTechnicianCard);
  const awaitingReports = (data?.items ?? [])
    .filter((item) => item.reportsAwaitingReview > 0)
    .map(toAwaitingReport);

  return (
    <>
      <div className="tech-grid">
        {!isLoading &&
          technicians.map((tech) => (
            <TechnicianCard
              key={tech.id}
              technician={tech}
              onViewSchedule={(id) => router.push(`/admin/calendar?technicianId=${id}`)}
              onAssignJob={setAssignTechnicianId}
              onEdit={(id) => router.push(`/admin/technicians/new?id=${id}`)}
              onReviewReport={() => router.push("/admin/reports")}
            />
          ))}
      </div>

      <ReportsAwaitingReview
        reports={awaitingReports}
        onReview={() => router.push("/admin/reports")}
      />

      <ScheduleServiceModal
        isOpen={Boolean(assignTechnicianId)}
        onClose={() => setAssignTechnicianId("")}
        initialTechnicianId={assignTechnicianId}
      />
    </>
  );
}

function toTechnicianCard(item: AdminTechnicianItem): Technician {
  const onCall = item.jobsInProgress > 0;

  return {
    id: item.id,
    initials: initials(item.firstName, item.lastName),
    name: `${item.firstName} ${item.lastName}`.trim(),
    role: item.skills[0] || "Field Technician",
    certifications: item.skills.length
      ? item.skills.join(", ")
      : item.serviceArea,
    rating: item.rating.toFixed(1),
    phone: item.phone || "—",
    email: item.email,
    jobsToday: item.jobsToday,
    jobsInProgress: item.jobsInProgress,
    status: onCall
      ? "On service call"
      : item.isAvailable
        ? "Available"
        : "Off duty",
    statusType: onCall ? "warning" : item.isAvailable ? "success" : "neutral",
  };
}

function toAwaitingReport(item: AdminTechnicianItem): ReportAwaitingReview {
  return {
    id: item.id,
    initials: initials(item.firstName, item.lastName),
    name: `${item.firstName} ${item.lastName}`.trim(),
    role: item.skills[0] || "Field Technician",
    reportStatus: "Report submitted",
  };
}

function initials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
