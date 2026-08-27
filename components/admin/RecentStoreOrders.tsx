"use client";

import type { AdminRecentOrder } from "@/redux/features/api/admin/dashboardApi";

const STATUS_CLASS: Record<string, string> = {
  SHIPPED: "admin-badge--shipped",
  PROCESSING: "admin-badge--processing",
  PAYMENT_PENDING: "admin-badge--pending",
  PAID: "admin-badge--paid",
  DELIVERED: "admin-badge--delivered",
};

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase() === "CAD" ? "CAD" : "USD",
  }).format(amount);
}

export default function RecentStoreOrders({
  orders = [],
}: {
  orders?: AdminRecentOrder[];
}) {
  return (
    <section className="admin-orders-panel" aria-label="Recent store orders">
      <div className="admin-orders-panel__header">
        <h2 className="admin-orders-panel__title">Recent Store Orders</h2>
      </div>
      <div className="admin-orders-table-scroll">
        <table className="admin-orders-table" aria-label="Store orders list">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5}>No recent orders.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customerName}</td>
                  <td>{money(order.amount, order.currency)}</td>
                  <td>{order.paymentStatus || "—"}</td>
                  <td>
                    <span className={`admin-badge ${STATUS_CLASS[order.status] || "admin-badge--pending"}`}>
                      {order.status.replaceAll("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
