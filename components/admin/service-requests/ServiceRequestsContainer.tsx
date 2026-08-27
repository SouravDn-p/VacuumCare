"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceRequestsFilterTabs from "./ServiceRequestsFilterTabs";
import ServiceRequestsTable from "./ServiceRequestsTable";
import {
  type RequestStatus,
  type ServiceRequestItem,
} from "./serviceRequestsData";
import { useGetAdminServiceRequestsQuery } from "@/redux/features/api/admin/serviceRequestsApi";
import type {
  AdminServiceRequestItem,
  AdminServiceRequestStatus,
} from "@/types/admin/serviceRequests";

const TAB_TO_API_STATUS: Record<RequestStatus, AdminServiceRequestStatus> = {
  New: "NEW",
  "Under Review": "UNDER_REVIEW",
  "Quote Sent": "QUOTE_SENT",
  Accepted: "ACCEPTED",
  Scheduled: "SCHEDULED",
  "In Progress": "IN_PROGRESS",
  "Report Submitted": "REPORT_SUBMITTED",
  Completed: "COMPLETED",
  Cancelled: "CANCELLED",
};

const STATUS_LABELS: Record<RequestStatus, string> = {
  New: "New Request",
  "Under Review": "Under review",
  "Quote Sent": "Quote sent",
  Accepted: "Accepted",
  Scheduled: "Scheduled",
  "In Progress": "In progress",
  "Report Submitted": "Report submitted",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export default function ServiceRequestsContainer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RequestStatus>("New");

  const { data, isLoading } = useGetAdminServiceRequestsQuery({
    status: TAB_TO_API_STATUS[activeTab],
    page: 1,
    pageSize: 100,
  });

  const currentItems = (data?.items ?? []).map(toTableItem);

  return (
    <div className="sr-content-layout">
      <ServiceRequestsFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ServiceRequestsTable
        items={isLoading ? [] : currentItems}
        onQuote={(item) => {
          if (!item.canQuote) return;
          router.push(`/admin/quotations/new?requestId=${item.id}`);
        }}
        onAssign={(item) => {
          if (!item.canAssign) return;
          router.push(`/admin/calendar?requestId=${item.id}`);
        }}
      />
    </div>
  );
}

function toTableItem(item: AdminServiceRequestItem): ServiceRequestItem {
  const status = toTabStatus(item.status);

  return {
    id: item.id,
    requestId: item.requestNumber,
    customerName: `${item.customer.firstName} ${item.customer.lastName}`.trim(),
    customerSubtext: item.issue?.name || item.description,
    service: item.category.name,
    submitted: formatSubmitted(item.createdAt),
    status,
    statusLabel: STATUS_LABELS[status],
    canQuote:
      item.status === "NEW" ||
      item.status === "UNDER_REVIEW" ||
      item.status === "QUOTE_SENT",
    canAssign: item.status === "ACCEPTED",
  };
}

function toTabStatus(status: AdminServiceRequestStatus): RequestStatus {
  switch (status) {
    case "NEW":
      return "New";
    case "UNDER_REVIEW":
      return "Under Review";
    case "QUOTE_SENT":
      return "Quote Sent";
    case "ACCEPTED":
      return "Accepted";
    case "SCHEDULED":
      return "Scheduled";
    case "IN_PROGRESS":
      return "In Progress";
    case "REPORT_SUBMITTED":
      return "Report Submitted";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "New";
  }
}

function formatSubmitted(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
