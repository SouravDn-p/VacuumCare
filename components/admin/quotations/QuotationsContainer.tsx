"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import QuotationsFilterTabs from "./QuotationsFilterTabs";
import QuotationsTable from "./QuotationsTable";
import { type QuotationTab } from "./quotationsData";
import { useGetAdminQuotationsQuery } from "@/redux/features/api/admin/quotationsApi";
import {
  useApproveAdminCounterofferMutation,
  useRejectAdminCounterofferMutation,
} from "@/redux/features/api/admin/counteroffersApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { AdminQuoteStatus } from "@/types/admin/quotations";

const TAB_TO_API: Record<QuotationTab, AdminQuoteStatus> = {
  Draft: "DRAFT",
  Sent: "SENT",
  Viewed: "VIEWED",
  Accepted: "ACCEPTED",
  Rejected: "REJECTED",
  Expired: "EXPIRED",
  Cancelled: "CANCELLED",
};

export default function QuotationsContainer() {
  const [activeTab, setActiveTab] = useState<QuotationTab>("Sent");

  const { data, isLoading } = useGetAdminQuotationsQuery({
    status: TAB_TO_API[activeTab],
    page: 1,
    pageSize: 100,
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

  return (
    <div className="quote-content-layout">
      <QuotationsFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <QuotationsTable
        quotations={isLoading ? [] : (data?.items ?? [])}
        onApproveCounteroffer={handleApprove}
        onRejectCounteroffer={handleReject}
      />
    </div>
  );
}
