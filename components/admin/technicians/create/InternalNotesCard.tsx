interface InternalNotesCardProps {
  notes: string;
  onNotesChange: (val: string) => void;
}

export default function InternalNotesCard({
  notes,
  onNotesChange,
}: InternalNotesCardProps) {
  return (
    <div className="at-card">
      <h2 className="at-card__title">Internal Notes</h2>

      <div className="at-field-group">
        <textarea
          id="at-internal-notes"
          className="at-textarea"
          rows={4}
          placeholder="Notes visible only to admin (not shown to technician)..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
}
