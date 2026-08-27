import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";

interface CreateQuotationHeaderProps {
  quoteId?: string;
  serviceRequestId?: string;
  customerName?: string;
  title?: string;
  readOnly?: boolean;
  lockNote?: string;
  onSaveDraft?: () => void;
  onSendQuotation?: () => void;
}

export default function CreateQuotationHeader({
  quoteId = "QT-2050",
  serviceRequestId = "SR-1048",
  customerName = "New Customer",
  title,
  readOnly = false,
  lockNote,
  onSaveDraft,
  onSendQuotation,
}: CreateQuotationHeaderProps) {
  return (
    <div className="cq-header">
      {/* Back Link */}
      <Link href="/admin/quotations" className="cq-back-link">
        <ArrowLeft size={16} className="cq-back-link__icon" />
        <span>Back</span>
      </Link>

      <div className="cq-header__content">
        <div className="cq-header__title-wrap">
          <h1 className="cq-header__title">
            {title ?? `Edit Quotation — ${quoteId}`}
          </h1>
          <p className="cq-header__subtitle">
            Service request: <span className="cq-header__sr-id">{serviceRequestId}</span> — {customerName}
          </p>
        </div>

        <div className="cq-header__actions admin-form-actions">
          <AdminActionButton
            variant="ghost"
            disabledReason={
              readOnly
                ? lockNote || "This quotation can no longer be updated."
                : undefined
            }
            onClick={onSaveDraft}
            aria-label="Save quotation as draft"
          >
            Save as draft
          </AdminActionButton>
          <AdminActionButton
            variant="primary"
            disabledReason={
              readOnly
                ? lockNote || "This quotation can no longer be updated."
                : undefined
            }
            onClick={onSendQuotation}
            aria-label="Send quotation to customer"
          >
            Send quotation
          </AdminActionButton>
        </div>
      </div>
    </div>
  );
}
