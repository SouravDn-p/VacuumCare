import { type ReturnRequestItem } from "./returnsData";

interface ReturnRequestCardProps {
  request: ReturnRequestItem;
  canApprove?: boolean;
  canReject?: boolean;
  canRefund?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  onRefund?: () => void;
}

export default function ReturnRequestCard({
  request,
  canApprove,
  canReject,
  canRefund,
  onApprove,
  onReject,
  onRefund,
}: ReturnRequestCardProps) {
  return (
    <div className="ret-card">
      {/* Card Header */}
      <div className="ret-card__header">
        <div className="ret-tech-profile">
          <div className="ret-tech-avatar" aria-hidden="true">
            {request.technician.initials}
          </div>
          <div className="ret-tech-info">
            <h3 className="ret-tech-name">{request.technician.name}</h3>
            <p className="ret-tech-role">{request.technician.role}</p>
          </div>
        </div>

        <span className="ret-status-badge">{request.status}</span>
      </div>

      {/* Details Grid */}
      <div className="ret-card__details">
        <div className="ret-detail-col">
          <span className="ret-detail-label">Order</span>
          <span className="ret-detail-value ret-detail-value--mono">
            {request.orderNumber}
          </span>
        </div>

        <div className="ret-detail-col">
          <span className="ret-detail-label">Product</span>
          <span className="ret-detail-value">{request.product}</span>
        </div>

        <div className="ret-detail-col ret-detail-col--wide">
          <span className="ret-detail-label">Reason</span>
          <span className="ret-detail-value">{request.reason}</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="ret-card__actions">
        <button
          type="button"
          className="ret-btn ret-btn--primary"
          aria-label="Approve return request"
          disabled={!canApprove}
          onClick={onApprove}
        >
          Approve return
        </button>

        <button
          type="button"
          className="ret-btn ret-btn--danger"
          aria-label="Reject return request"
          disabled={!canReject}
          onClick={onReject}
        >
          Reject Return
        </button>

        <button
          type="button"
          className="ret-btn ret-btn--secondary"
          aria-label="Issue refund after return"
          disabled={!canRefund}
          onClick={onRefund}
        >
          Issue refund after return
        </button>
      </div>
    </div>
  );
}
