"use client";

import toast from "react-hot-toast";
import ReturnsHeader from "./ReturnsHeader";
import ReturnRequestCard from "./ReturnRequestCard";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  useGetAdminReturnsQuery,
  useRefundAdminReturnMutation,
  useUpdateAdminReturnStatusMutation,
} from "@/redux/features/api/admin/returnsApi";

const STATUS_LABEL: Record<string, "Pending approval" | "Approved" | "Rejected" | "Completed"> = {
  REQUESTED: "Pending approval",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  RECEIVED: "Approved",
  REFUNDED: "Completed",
};

export default function ReturnsContainer() {
  const { data } = useGetAdminReturnsQuery();
  const [updateStatus] = useUpdateAdminReturnStatusMutation();
  const [refundReturn] = useRefundAdminReturnMutation();
  const items = data?.items ?? [];

  return (
    <>
      <ReturnsHeader pendingCount={items.filter((item) => item.status === "REQUESTED").length} />
      <div className="ret-list">
        {items.length === 0 ? (
          <p>No return requests yet.</p>
        ) : (
          items.map((item) => (
            <ReturnRequestCard
              key={item.id}
              request={{
                id: item.id,
                technician: {
                  initials: `${item.customer.firstName[0] ?? ""}${item.customer.lastName[0] ?? ""}`,
                  name: `${item.customer.firstName} ${item.customer.lastName}`.trim(),
                  role: item.customer.email,
                },
                status: STATUS_LABEL[item.status] ?? "Pending approval",
                orderNumber: item.orderNumber,
                product: item.item?.product?.name || "Order item",
                reason: item.reason,
              }}
              canApprove={item.actionEligibility.allowedStatusTransitions.includes("APPROVED")}
              canReject={item.actionEligibility.allowedStatusTransitions.includes("REJECTED")}
              canRefund={item.actionEligibility.canRefund}
              onApprove={async () => {
                try {
                  await updateStatus({ id: item.id, status: "APPROVED" }).unwrap();
                  toast.success("Return approved");
                } catch (error) {
                  toast.error(getApiErrorMessage(error, "Could not approve this return"));
                }
              }}
              onReject={async () => {
                try {
                  await updateStatus({ id: item.id, status: "REJECTED" }).unwrap();
                  toast.success("Return rejected");
                } catch (error) {
                  toast.error(getApiErrorMessage(error, "Could not reject this return"));
                }
              }}
              onRefund={async () => {
                try {
                  await refundReturn({
                    orderId: item.orderId,
                    returnRequestId: item.id,
                  }).unwrap();
                  toast.success("Refund issued");
                } catch (error) {
                  toast.error(getApiErrorMessage(error, "Could not refund this return"));
                }
              }}
            />
          ))
        )}
      </div>
    </>
  );
}
