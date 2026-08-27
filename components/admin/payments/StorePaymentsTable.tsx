import Link from "next/link";
import {
  STORE_PAYMENTS_LIST,
  type StorePaymentItem,
} from "./paymentsData";

interface StorePaymentsTableProps {
  data?: StorePaymentItem[];
}

export default function StorePaymentsTable({
  data = STORE_PAYMENTS_LIST,
}: StorePaymentsTableProps) {
  return (
    <div className="pay-table-card">
      <div className="pay-table-scroll">
        <table className="pay-table" aria-label="Store payments list">
          <thead>
            <tr>
              <th className="pay-table__th" scope="col">Order</th>
              <th className="pay-table__th" scope="col">Customer</th>
              <th className="pay-table__th" scope="col">Amount</th>
              <th className="pay-table__th" scope="col">Method</th>
              <th className="pay-table__th" scope="col">Date</th>
              <th className="pay-table__th" scope="col">Status</th>
              <th className="pay-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="pay-table__tr">
                <td className="pay-table__td pay-table__td--order">
                  {item.order}
                </td>
                <td className="pay-table__td pay-table__td--customer">
                  {item.customer}
                </td>
                <td className="pay-table__td pay-table__td--amt">
                  {item.amount}
                </td>
                <td className="pay-table__td pay-table__td--method">
                  {item.method}
                </td>
                <td className="pay-table__td pay-table__td--date">
                  {item.date}
                </td>
                <td className="pay-table__td">
                  <span className="pay-badge pay-badge--paid">
                    {item.status}
                  </span>
                </td>
                <td className="pay-table__td pay-table__td--action">
                  <Link
                    href={item.invoiceHref ?? `/admin/payments/${item.id}`}
                    className="admin-btn admin-btn--ghost"
                  >
                    Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
