interface PersonalInformationCardProps {
  firstName: string;
  onFirstNameChange: (val: string) => void;
  lastName: string;
  onLastNameChange: (val: string) => void;
  role: string;
  onRoleChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  emailReadOnly?: boolean;
}

export const TECHNICIAN_ROLES = [
  "Field Technician",
  "Senior Technician",
  "Lead Technician",
  "Apprentice",
];

export default function PersonalInformationCard({
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  role,
  onRoleChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  emailReadOnly = false,
}: PersonalInformationCardProps) {
  return (
    <div className="at-card">
      <h2 className="at-card__title">Personal Information</h2>

      <div className="at-form-grid">
        {/* First name */}
        <div className="at-field-group">
          <label htmlFor="at-first-name" className="at-field-label">
            First name
          </label>
          <input
            type="text"
            id="at-first-name"
            className="at-input"
            placeholder="Marc"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
          />
        </div>

        {/* Last name */}
        <div className="at-field-group">
          <label htmlFor="at-last-name" className="at-field-label">
            Last name
          </label>
          <input
            type="text"
            id="at-last-name"
            className="at-input"
            placeholder="Anderson"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="at-field-group at-field-group--full">
          <label htmlFor="at-role" className="at-field-label">
            Role
          </label>
          <div className="at-select-wrap">
            <select
              id="at-role"
              className="at-select"
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
            >
              {TECHNICIAN_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Phone number */}
        <div className="at-field-group">
          <label htmlFor="at-phone" className="at-field-label">
            Phone number
          </label>
          <input
            type="tel"
            id="at-phone"
            className="at-input"
            placeholder="(514) 555-0000"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>

        {/* Work email */}
        <div className="at-field-group">
          <label htmlFor="at-email" className="at-field-label">
            Work email
          </label>
          <input
            type="email"
            id="at-email"
            className="at-input"
            placeholder="marc@centralcare.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            readOnly={emailReadOnly}
          />
        </div>
      </div>
    </div>
  );
}
