import type { ReactNode } from "react";
import { Plus } from "lucide-react";

export default function EquipmentHeader({
  customerName,
  children,
}: {
  customerName?: string;
  children?: ReactNode;
}) {
  return (
    <div className="eq-header">
      <div className="eq-header__title-wrap">
        <h1 className="eq-header__title">Equipment &amp; Vacuum Ports</h1>
        <p className="eq-header__subtitle">
          <span className="eq-header__customer-name">
            {customerName || "Select a customer"}
          </span>
          <span className="eq-header__access-tag">Admin and technician access only</span>
        </p>
      </div>

      <div className="eq-header__actions">
        {children}
        <button
          type="button"
          id="eq-upload-photos-btn"
          className="eq-btn eq-btn--secondary"
          aria-label="Upload equipment photos"
        >
          Upload equipment photos
        </button>

        <button
          type="button"
          id="eq-add-unit-btn"
          className="eq-btn eq-btn--primary"
          aria-label="Add vacuum unit"
        >
          <Plus size={18} strokeWidth={2} className="eq-btn__icon" />
          <span className="eq-btn__text">Add vacuum unit</span>
        </button>
      </div>
    </div>
  );
}
