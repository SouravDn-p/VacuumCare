"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import OrdersFilterTabs from "./OrdersFilterTabs";
import OrdersTable from "./OrdersTable";
import { type OrderItem, type OrderStatus, type OrderTab } from "./ordersData";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useRefundAdminOrderMutation } from "@/redux/features/api/admin/paymentsApi";
import {
  useGetAdminOrdersQuery,
  useUpdateAdminOrderStatusMutation,
  type AdminOrderStatus,
} from "@/redux/features/api/admin/ordersApi";

const TAB_STATUS: Record<Exclude<OrderTab, "COD orders">, AdminOrderStatus> = {
  Pending: "PAYMENT_PENDING",
  Paid: "PAID",
  Processing: "PROCESSING",
  Shipped: "SHIPPED",
  Delivered: "DELIVERED",
  Cancelled: "CANCELLED",
  Refunded: "REFUNDED",
};

const STATUS_LABEL: Record<AdminOrderStatus, OrderStatus> = {
  PAYMENT_PENDING: "Pending",
  PLACED: "Pending",
  PAID: "Paid",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PAYMENT_FAILED: "Cancelled",
  REFUNDED: "Refunded",
};

export default function OrdersContainer() {
  const [activeTab, setActiveTab] = useState<OrderTab>("Pending");
  const status =
    activeTab === "COD orders" ? undefined : TAB_STATUS[activeTab];
  const { data } = useGetAdminOrdersQuery(
    activeTab === "COD orders" ? { pageSize: 1 } : { status, pageSize: 50 },
    { skip: activeTab === "COD orders" },
  );
  const [updateStatus] = useUpdateAdminOrderStatusMutation();
  const [refundOrder] = useRefundAdminOrderMutation();

  const orders: OrderItem[] =
    activeTab === "COD orders"
      ? []
      : (data?.items ?? []).map((order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customer: `${order.customer.firstName} ${order.customer.lastName}`.trim(),
          date: new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          total: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(order.total),
          payment: order.status === "PAYMENT_PENDING" ? "Pending" : "Paid via Stripe",
          isCod: false,
          status: STATUS_LABEL[order.status],
          nextStatus: order.actionEligibility.allowedStatusTransitions[0],
        }));

  return (
    <div className="ord-content-layout">
      <OrdersFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <OrdersTable
        orders={orders}
        onAdvance={async (id, nextStatus) => {
          if (!nextStatus || !(nextStatus in STATUS_LABEL)) return;
          try {
            await updateStatus({
              id,
              status: nextStatus as AdminOrderStatus,
            }).unwrap();
            toast.success("Order status updated");
          } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not update this order"));
          }
        }}
        onRefund={async (id) => {
          try {
            await refundOrder({ orderId: id }).unwrap();
            toast.success("Refund issued");
          } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not refund this order"));
          }
        }}
      />
    </div>
  );
}
