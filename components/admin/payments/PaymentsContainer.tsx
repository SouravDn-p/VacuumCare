"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PaymentsFilterTabs from "./PaymentsFilterTabs";
import ServiceAuthorizationsTable from "./ServiceAuthorizationsTable";
import FailedPaymentsTable from "./FailedPaymentsTable";
import StorePaymentsTable from "./StorePaymentsTable";
import EmptyPaymentsCard from "./EmptyPaymentsCard";
import { type PaymentTab } from "./paymentsData";
import {
  useCaptureAdminPaymentMutation,
  useGetAdminPaymentsQuery,
  useRefundAdminOrderMutation,
} from "@/redux/features/api/admin/paymentsApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { AdminPayment } from "@/types/admin/payments";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";

function money(value: number | string) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function personName(payment: AdminPayment) {
  return `${payment.user.firstName} ${payment.user.lastName}`.trim();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function serviceStatusLabel(status?: string) {
  switch (status) {
    case "REPORT_SUBMITTED":
      return "Report submitted";
    case "SCHEDULED":
    case "IN_PROGRESS":
      return "Scheduled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Under review";
  }
}

export default function PaymentsContainer() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("Service authorizations");
  const { data, isLoading } = useGetAdminPaymentsQuery({
    page: 1,
    pageSize: 100,
  });
  const [capturePayment] = useCaptureAdminPaymentMutation();
  const [refundOrder] = useRefundAdminOrderMutation();

  const items = data?.items ?? [];

  const handleCapture = async (id: string) => {
    try {
      await capturePayment(id).unwrap();
      toast.success("Payment captured.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not capture this payment."));
    }
  };

  const handleRefund = async (orderId: string | null) => {
    if (!orderId) {
      toast.error("This payment is not linked to a store order.");
      return;
    }
    try {
      await refundOrder({ orderId }).unwrap();
      toast.success("Order refunded.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not refund this payment."));
    }
  };

  const handleStripe = async (reference: string | null) => {
    if (!reference) {
      toast.error("No Stripe reference is saved for this payment.");
      return;
    }
    await navigator.clipboard.writeText(reference);
    toast.success("Stripe reference copied.");
  };

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "Service authorizations":
        return items.filter(
          (item) =>
            item.purpose === "QUOTATION" && item.status === "AUTHORIZED",
        );
      case "Captured payments":
        return items.filter(
          (item) =>
            item.purpose === "QUOTATION" &&
            (item.status === "CAPTURED" || item.status === "SUCCEEDED"),
        );
      case "Refunded payments":
        return items.filter(
          (item) =>
            item.status === "REFUNDED" || item.status === "PARTIALLY_REFUNDED",
        );
      case "Failed payments":
        return items.filter((item) => item.status === "FAILED");
      case "Store payments":
        return items.filter((item) => item.purpose === "ORDER");
      default:
        return items;
    }
  }, [activeTab, items]);

  const actionButtons = (payment: AdminPayment) => (
    <div className="pay-actions-cell admin-btn-row">
      {payment.actionEligibility.canCapture ? (
        <AdminActionButton
          variant="primary"
          onClick={() => handleCapture(payment.id)}
        >
          Capture
        </AdminActionButton>
      ) : (
        <AdminActionButton
          disabledReason="Capture is available after the customer confirms the service report."
        >
          Capture
        </AdminActionButton>
      )}
      <AdminActionButton
        variant="danger"
        disabledReason={
          payment.actionEligibility.canRefundOrder
            ? undefined
            : "Refund is available after an approved store return."
        }
        onClick={() => handleRefund(payment.orderId)}
      >
        Refund
      </AdminActionButton>
      <AdminActionButton
        variant="ghost"
        onClick={() => handleStripe(payment.providerReference)}
      >
        Stripe
      </AdminActionButton>
      <Link href={`/admin/payments/${payment.id}`} className="admin-btn admin-btn--ghost">
        Invoice
      </Link>
    </div>
  );

  return (
    <div className="pay-content-layout">
      <PaymentsFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {isLoading ? (
        <EmptyPaymentsCard message="Loading payments..." />
      ) : activeTab === "Service authorizations" ? (
        <ServiceAuthorizationsTable
          data={filtered.map((item) => ({
            id: item.id,
            customer: personName(item),
            serviceRequest: item.requestNumber ?? "—",
            authorizedAmount: money(item.amount),
            paymentStatus: "Authorized",
            serviceStatus: serviceStatusLabel(item.quotation?.request?.status),
            actions: actionButtons(item),
          }))}
        />
      ) : activeTab === "Failed payments" ? (
        <FailedPaymentsTable
          data={filtered.map((item) => ({
            id: item.id,
            customer: personName(item),
            serviceRequest: item.requestNumber ?? item.orderNumber ?? "—",
            amount: money(item.amount),
            reason: item.failureMessage || "Payment failed",
            date: formatDate(item.createdAt),
            status: "Failed",
          }))}
        />
      ) : activeTab === "Store payments" ? (
        <StorePaymentsTable
          data={filtered.map((item) => ({
            id: item.id,
            order: item.orderNumber ?? "—",
            customer: personName(item),
            amount: money(item.amount),
            method: item.paymentMethod || item.provider,
            date: formatDate(item.createdAt),
            status: item.status === "REFUNDED" ? "Refunded" : "Paid",
          }))}
        />
      ) : filtered.length === 0 ? (
        <EmptyPaymentsCard />
      ) : (
        <StorePaymentsTable
          data={filtered.map((item) => ({
            id: item.id,
            order: item.orderNumber ?? item.requestNumber ?? "—",
            customer: personName(item),
            amount: money(item.amount),
            method: item.paymentMethod || item.provider,
            date: formatDate(item.createdAt),
            status:
              item.status === "REFUNDED" || item.status === "PARTIALLY_REFUNDED"
                ? "Refunded"
                : item.status === "CAPTURED"
                  ? "Captured"
                  : "Paid",
          }))}
        />
      )}
    </div>
  );
}
