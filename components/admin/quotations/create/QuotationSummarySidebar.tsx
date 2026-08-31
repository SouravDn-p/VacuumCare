import AdminActionButton from "@/components/admin/ui/AdminActionButton";

interface QuotationSummarySidebarProps {
  customerName?: string;
  serviceRequestId?: string;
  totalAmount: number;
  quotedAmount?: number;
  customerOfferAmount?: number | null;
  offerPending?: boolean;
  onSendQuotation?: () => void;
  onSaveDraft?: () => void;
  onApproveOffer?: () => void;
  onRejectOffer?: () => void;
  isSending?: boolean;
  isDeciding?: boolean;
  isDraftSaved?: boolean;
  readOnly?: boolean;
  statusNote?: string;
}

export default function QuotationSummarySidebar({
  customerName = "New Customer",
  serviceRequestId = "SR-1048",
  totalAmount,
  quotedAmount,
  customerOfferAmount = null,
  offerPending = false,
  onSendQuotation,
  onSaveDraft,
  onApproveOffer,
  onRejectOffer,
  isSending = false,
  isDeciding = false,
  isDraftSaved = false,
  readOnly = false,
  statusNote,
}: QuotationSummarySidebarProps) {
  return (
    <aside className="cq-summary-card">
      <h3 className="cq-summary-heading">SUMMARY</h3>

      <div className="cq-summary-list">
        <div className="cq-summary-row">
          <span className="cq-summary-label">Customer</span>
          <span className="cq-summary-value">{customerName}</span>
        </div>

        <div className="cq-summary-row">
          <span className="cq-summary-label">SR</span>
          <span className="cq-summary-value cq-summary-value--sr">
            {serviceRequestId}
          </span>
        </div>

        {customerOfferAmount != null ? (
          <>
            <div className="cq-summary-row">
              <span className="cq-summary-label">Quoted</span>
              <span className="cq-summary-value">
                ${(quotedAmount ?? totalAmount).toFixed(2)}
              </span>
            </div>
            <div className="cq-summary-row cq-summary-row--total">
              <span className="cq-summary-label cq-summary-label--total">
                Customer offer
              </span>
              <span className="cq-summary-value cq-summary-value--total">
                ${customerOfferAmount.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <div className="cq-summary-row cq-summary-row--total">
            <span className="cq-summary-label cq-summary-label--total">Total</span>
            <span className="cq-summary-value cq-summary-value--total">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {readOnly && statusNote ? (
        <p className="cq-summary-label">{statusNote}</p>
      ) : null}

      {offerPending ? (
        <div className="cq-summary-actions">
          <AdminActionButton
            variant="primary"
            className="cq-btn--full"
            disabledReason={
              isDeciding ? "The negotiation is still being updated." : undefined
            }
            onClick={onApproveOffer}
          >
            {isDeciding ? "Updating..." : "Approve offer"}
          </AdminActionButton>
          <AdminActionButton
            variant="danger"
            className="cq-btn--full"
            disabledReason={
              isDeciding ? "The negotiation is still being updated." : undefined
            }
            onClick={onRejectOffer}
          >
            Reject offer
          </AdminActionButton>
        </div>
      ) : null}

      <div className="cq-summary-actions">
        <AdminActionButton
          id="cq-send-quotation-btn"
          variant="primary"
          className="cq-btn--full"
          disabledReason={
            readOnly
              ? statusNote || "This quotation can no longer be updated."
              : isSending
                ? "The quotation is still being sent."
                : undefined
          }
          onClick={onSendQuotation}
          aria-label="Send quotation"
        >
          {isSending ? "Sending..." : "Send quotation"}
        </AdminActionButton>

        <AdminActionButton
          id="cq-save-draft-btn"
          variant="ghost"
          className="cq-btn--full"
          disabledReason={
            readOnly
              ? statusNote || "This quotation can no longer be updated."
              : undefined
          }
          onClick={onSaveDraft}
          aria-label="Save as draft"
        >
          {isDraftSaved ? "Draft saved!" : "Save as draft"}
        </AdminActionButton>
      </div>
    </aside>
  );
}
