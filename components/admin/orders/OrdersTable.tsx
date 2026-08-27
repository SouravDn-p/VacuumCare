import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { type OrderItem, type OrderStatus } from "./ordersData";

interface OrdersTableProps {
  orders: OrderItem[];
  onAdvance?: (id: string, nextStatus?: string) => void;
  onRefund?: (id: string) => void;
}

function getStatusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "Pending":
      return "ord-badge--pending";
    case "Paid":
      return "ord-badge--paid";
    case "Processing":
      return "ord-badge--processing";
    case "Shipped":
      return "ord-badge--shipped";
    case "Delivered":
      return "ord-badge--delivered";
    case "Cancelled":
      return "ord-badge--cancelled";
    case "Refunded":
      return "ord-badge--refunded";
    default:
      return "ord-badge--default";
  }
}

export default function OrdersTable({
  orders,
  onAdvance,
  onRefund,
}: OrdersTableProps) {
  return (
    <div className="ord-table-card">
      <div className="ord-table-scroll">
        <table className="ord-table" aria-label="Customer orders list">
          <thead>
            <tr>
              <th className="ord-table__th" scope="col">Order</th>
              <th className="ord-table__th" scope="col">Customer</th>
              <th className="ord-table__th" scope="col">Date</th>
              <th className="ord-table__th" scope="col">Total</th>
              <th className="ord-table__th" scope="col">Payment</th>
              <th className="ord-table__th" scope="col">Status</th>
              <th className="ord-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="ord-table__empty-cell">
                  <p className="ord-table__empty-text">No requests in this status.</p>
                </td>
              </tr>
            ) : (
              orders.map((ord) => (
                <tr key={ord.id} className="ord-table__tr">
                  <td className="ord-table__td ord-table__td--order">
                    {ord.orderNumber}
                  </td>
                  <td className="ord-table__td ord-table__td--customer">
                    {ord.customer}
                  </td>
                  <td className="ord-table__td ord-table__td--date">
                    {ord.date}
                  </td>
                  <td className="ord-table__td ord-table__td--total">
                    {ord.total}
                  </td>
                  <td className="ord-table__td ord-table__td--payment">
                    {ord.payment}
                  </td>
                  <td className="ord-table__td ord-table__td--status">
                    <span className={`ord-badge ${getStatusBadgeClass(ord.status)}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="ord-table__td ord-table__td--action">
                    <div className="ord-actions-cell admin-btn-row">
                      <AdminActionButton
                        variant="ghost"
                        disabled={!ord.nextStatus}
                        onClick={() => onAdvance?.(ord.id, ord.nextStatus)}
                      >
                        {ord.nextStatus ? "Advance" : "View"}
                      </AdminActionButton>
                      <AdminActionButton
                        variant="danger"
                        onClick={() => onRefund?.(ord.id)}
                      >
                        Refund
                      </AdminActionButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
