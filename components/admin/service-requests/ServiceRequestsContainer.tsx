"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceRequestsFilterTabs from "./ServiceRequestsFilterTabs";
import ServiceRequestsTable from "./ServiceRequestsTable";
import {
  type RequestStatus,
  type RequestTab,
  type ServiceRequestItem,
} from "./serviceRequestsData";
import { useGetAdminServiceRequestsQuery } from "@/redux/features/api/admin/serviceRequestsApi";
import {
  useApproveAdminCounterofferMutation,
  useRejectAdminCounterofferMutation,
} from "@/redux/features/api/admin/counteroffersApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
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
  const [activeTab, setActiveTab] = useState<RequestTab>("All");

  const { data, isLoading } = useGetAdminServiceRequestsQuery({
    page: 1,
    pageSize: 100,
    ...(activeTab === "All" ? {} : { status: TAB_TO_API_STATUS[activeTab] }),
  });

  const [approveCounteroffer] = useApproveAdminCounterofferMutation();
  const [rejectCounteroffer] = useRejectAdminCounterofferMutation();

  const handleApprove = async (counterofferId: string) => {
    try {
      await approveCounteroffer({ id: counterofferId }).unwrap();
      toast.success("Counteroffer approved. The customer still needs to accept the quote.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not approve the counteroffer."));
    }
  };

  const handleReject = async (counterofferId: string) => {
    try {
      await rejectCounteroffer({ id: counterofferId }).unwrap();
      toast.success("Counteroffer rejected.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not reject the counteroffer."));
    }
  };

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
        onApproveCounteroffer={handleApprove}
        onRejectCounteroffer={handleReject}
      />
    </div>
  );
}

function toTableItem(item: AdminServiceRequestItem): ServiceRequestItem {
  const status = toTabStatus(item.status);
  const pending = item.quotation?.pendingNegotiation ?? null;

  return {
    id: item.id,
    requestId: item.requestNumber,
    customerName: `${item.customer.firstName} ${item.customer.lastName}`.trim(),
    customerSubtext: item.issue?.name || item.description,
    service: item.category.name,
    submitted: formatSubmitted(item.createdAt),
    status,
    statusLabel: STATUS_LABELS[status],
    quoteAmount: item.quotation?.totalAmount ?? null,
    customerNegotiationPrice:
      pending?.requestedTotal ?? item.quotation?.negotiatedTotal ?? null,
    pendingNegotiationId: pending?.id ?? null,
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
