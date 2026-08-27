interface CredentialsCertificationsCardProps {
  certifications: string;
  onCertificationsChange: (val: string) => void;
  skills: string[];
  onToggleSkill: (skill: string) => void;
}

export const AVAILABLE_SKILLS = [
  "Low suction",
  "Blockage removal",
  "Inlet valve repair",
  "Annual maintenance",
  "Motor issues",
  "New installations",
];

export default function CredentialsCertificationsCard({
  certifications,
  onCertificationsChange,
  skills,
  onToggleSkill,
}: CredentialsCertificationsCardProps) {
  return (
    <div className="at-card">
      <h2 className="at-card__title">Credentials &amp; Certifications</h2>

      <div className="at-field-group">
        <label htmlFor="at-certifications" className="at-field-label">
          Certifications
        </label>
        <input
          type="text"
          id="at-certifications"
          className="at-input"
          placeholder="e.g. CVAC Level 2, HRAI, Gas Fitter Class B"
          value={certifications}
          onChange={(e) => onCertificationsChange(e.target.value)}
        />
      </div>

      <div className="at-skills-grid">
        {AVAILABLE_SKILLS.map((skill) => {
          const isChecked = skills.includes(skill);
          return (
            <label key={skill} className="at-checkbox-label">
              <input
                type="checkbox"
                className="at-checkbox"
                checked={isChecked}
                onChange={() => onToggleSkill(skill)}
              />
              <span className="at-checkbox-text">{skill}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
