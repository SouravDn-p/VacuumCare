interface QuotationNotesCardProps {
  customerNotes: string;
  onCustomerNotesChange: (val: string) => void;
  internalNotes: string;
  onInternalNotesChange: (val: string) => void;
  readOnly?: boolean;
}

export default function QuotationNotesCard({
  customerNotes,
  onCustomerNotesChange,
  internalNotes,
  onInternalNotesChange,
  readOnly = false,
}: QuotationNotesCardProps) {
  return (
    <div className="cq-card">
      <div className="cq-notes-stack">
        {/* Customer-facing notes */}
        <div className="cq-field-group">
          <label htmlFor="cq-customer-notes" className="cq-field-label">
            Customer-facing notes
          </label>
          <textarea
            id="cq-customer-notes"
            className="cq-textarea"
            rows={4}
            placeholder="Enter notes visible to the customer..."
            value={customerNotes}
            onChange={(e) => onCustomerNotesChange(e.target.value)}
            readOnly={readOnly}
          />
        </div>

        {/* Internal notes */}
        <div className="cq-field-group">
          <label htmlFor="cq-internal-notes" className="cq-field-label">
            Internal notes
          </label>
          <textarea
            id="cq-internal-notes"
            className="cq-textarea"
            rows={4}
            placeholder="Enter private internal notes for staff and technicians..."
            value={internalNotes}
            onChange={(e) => onInternalNotesChange(e.target.value)}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}
