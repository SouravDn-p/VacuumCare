import {
  type ServiceAuthorizationItem,
} from "./paymentsData";

interface ServiceAuthorizationsTableProps {
  data: ServiceAuthorizationItem[];
}

export default function ServiceAuthorizationsTable({
  data,
}: ServiceAuthorizationsTableProps) {
  return (
    <div className="pay-table-card">
      <div className="pay-table-scroll">
        <table className="pay-table" aria-label="Service authorizations list">
          <thead>
            <tr>
              <th className="pay-table__th" scope="col">Customer</th>
              <th className="pay-table__th" scope="col">Service request</th>
              <th className="pay-table__th" scope="col">Authorized amount</th>
              <th className="pay-table__th" scope="col">Payment status</th>
              <th className="pay-table__th" scope="col">Service status</th>
              <th className="pay-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="pay-table__td">
                  No service authorizations to display.
                </td>
              </tr>
            ) : (
              data.map((item) => (
              <tr key={item.id} className="pay-table__tr">
                <td className="pay-table__td pay-table__td--customer">
                  {item.customer}
                </td>
                <td className="pay-table__td pay-table__td--req">
                  {item.serviceRequest}
                </td>
                <td className="pay-table__td pay-table__td--amt">
                  {item.authorizedAmount}
                </td>
                <td className="pay-table__td">
                  <span
                    className={`pay-badge ${
                      item.paymentStatus === "Authorized"
                        ? "pay-badge--authorized"
                        : "pay-badge--captured"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="pay-table__td">
                  <span
                    className={`pay-badge ${
                      item.serviceStatus === "Report submitted"
                        ? "pay-badge--report-submitted"
                        : item.serviceStatus === "Scheduled"
                        ? "pay-badge--scheduled"
                        : item.serviceStatus === "Completed"
                        ? "pay-badge--completed"
                        : "pay-badge--under-review"
                    }`}
                  >
                    {item.serviceStatus}
                  </span>
                </td>
                <td className="pay-table__td pay-table__td--action">
                  {item.actions}
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

