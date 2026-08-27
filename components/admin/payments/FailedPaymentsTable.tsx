import Link from "next/link";
import {
  FAILED_PAYMENTS_LIST,
  type FailedPaymentItem,
} from "./paymentsData";

interface FailedPaymentsTableProps {
  data?: FailedPaymentItem[];
}

export default function FailedPaymentsTable({
  data = FAILED_PAYMENTS_LIST,
}: FailedPaymentsTableProps) {
  return (
    <div className="pay-table-card">
      <div className="pay-table-scroll">
        <table className="pay-table" aria-label="Failed payments list">
          <thead>
            <tr>
              <th className="pay-table__th" scope="col">Customer</th>
              <th className="pay-table__th" scope="col">Service request</th>
              <th className="pay-table__th" scope="col">Amount</th>
              <th className="pay-table__th" scope="col">Reason</th>
              <th className="pay-table__th" scope="col">Date</th>
              <th className="pay-table__th" scope="col">Status</th>
              <th className="pay-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="pay-table__tr">
                <td className="pay-table__td pay-table__td--customer">
                  {item.customer}
                </td>
                <td className="pay-table__td pay-table__td--req">
                  {item.serviceRequest}
                </td>
                <td className="pay-table__td pay-table__td--amt">
                  {item.amount}
                </td>
                <td className="pay-table__td pay-table__td--reason">
                  {item.reason}
                </td>
                <td className="pay-table__td pay-table__td--date">
                  {item.date}
                </td>
                <td className="pay-table__td">
                  <span className="pay-badge pay-badge--failed">
                    {item.status}
                  </span>
                </td>
                <td className="pay-table__td pay-table__td--action">
                  <Link
                    href={`/admin/payments/${item.id}`}
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
