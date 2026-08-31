import AdminActionButton from "@/components/admin/ui/AdminActionButton";

interface CustomerNegotiationCardProps {
  quotedAmount: number;
  requestedAmount: number;
  note: string | null;
  status: "PENDING" | "APPROVED";
  onApprove?: () => void;
  onReject?: () => void;
  isDeciding?: boolean;
}

function formatMoney(amount: number) {
  return `$${Number(amount).toFixed(2)}`;
}

export default function CustomerNegotiationCard({
  quotedAmount,
  requestedAmount,
  note,
  status,
  onApprove,
  onReject,
  isDeciding = false,
}: CustomerNegotiationCardProps) {
  const isPending = status === "PENDING";

  return (
    <div className="cq-card cq-negotiate-card">
      <h2 className="cq-card__title">Customer negotiation</h2>
      <p className="cq-negotiate-copy">
        {isPending
          ? "The customer proposed a different total. Approve it to update the quote, or reject it and keep the original amount."
          : "This customer offer was approved. The customer still needs to accept the quotation."}
      </p>

      <div className="cq-price-rows">
        <div className="cq-price-row">
          <span className="cq-price-label">Quoted amount</span>
          <span className="cq-price-value">{formatMoney(quotedAmount)}</span>
        </div>
        <div className="cq-price-row cq-price-row--total">
          <span className="cq-price-label cq-price-label--total">
            Customer offer
          </span>
          <span className="cq-price-value cq-price-value--total">
            {formatMoney(requestedAmount)}
          </span>
        </div>
      </div>

      {note ? (
        <p className="cq-negotiate-note">
          <span className="cq-negotiate-note__label">Customer note</span>
          {note}
        </p>
      ) : null}

      {isPending ? (
        <div className="cq-negotiate-actions admin-btn-row">
          <AdminActionButton
            variant="primary"
            disabledReason={
              isDeciding ? "The negotiation is still being updated." : undefined
            }
            onClick={onApprove}
          >
            {isDeciding ? "Updating..." : "Approve offer"}
          </AdminActionButton>
          <AdminActionButton
            variant="danger"
            disabledReason={
              isDeciding ? "The negotiation is still being updated." : undefined
            }
            onClick={onReject}
          >
            Reject offer
          </AdminActionButton>
        </div>
      ) : (
        <span className="quote-negotiate__pending">Approved</span>
      )}
    </div>
  );
}
