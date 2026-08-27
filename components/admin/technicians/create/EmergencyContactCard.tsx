interface EmergencyContactCardProps {
  contactName: string;
  onContactNameChange: (val: string) => void;
  contactPhone: string;
  onContactPhoneChange: (val: string) => void;
}

export default function EmergencyContactCard({
  contactName,
  onContactNameChange,
  contactPhone,
  onContactPhoneChange,
}: EmergencyContactCardProps) {
  return (
    <div className="at-card">
      <h2 className="at-card__title">Emergency Contact</h2>

      <div className="at-form-grid">
        <div className="at-field-group">
          <label htmlFor="at-emergency-name" className="at-field-label">
            Contact name
          </label>
          <input
            type="text"
            id="at-emergency-name"
            className="at-input"
            placeholder="Full name"
            value={contactName}
            onChange={(e) => onContactNameChange(e.target.value)}
          />
        </div>

        <div className="at-field-group">
          <label htmlFor="at-emergency-phone" className="at-field-label">
            Contact phone
          </label>
          <input
            type="tel"
            id="at-emergency-phone"
            className="at-input"
            placeholder="(514) 555-0000"
            value={contactPhone}
            onChange={(e) => onContactPhoneChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
