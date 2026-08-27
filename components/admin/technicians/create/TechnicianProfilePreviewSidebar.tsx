import Link from "next/link";
import { Upload } from "lucide-react";

interface TechnicianProfilePreviewSidebarProps {
  displayName: string;
  displayRole: string;
  mobileAppAccess: boolean;
  onToggleMobileAppAccess: () => void;
  viewCustomerInfo: boolean;
  onToggleViewCustomerInfo: () => void;
  submitJobReports: boolean;
  onToggleSubmitJobReports: () => void;
  viewOtherSchedules: boolean;
  onToggleViewOtherSchedules: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
}

export default function TechnicianProfilePreviewSidebar({
  displayName,
  displayRole,
  mobileAppAccess,
  onToggleMobileAppAccess,
  viewCustomerInfo,
  onToggleViewCustomerInfo,
  submitJobReports,
  onToggleSubmitJobReports,
  viewOtherSchedules,
  onToggleViewOtherSchedules,
  isSubmitting = false,
  submitLabel = "Add technician",
  submittingLabel = "Adding technician...",
}: TechnicianProfilePreviewSidebarProps) {
  return (
    <aside className="at-sidebar-stack">
      {/* Profile Avatar Card */}
      <div className="at-card at-profile-card">
        <div className="at-avatar-circle" aria-hidden="true">
          <span className="at-avatar-icon">?</span>
        </div>

        <div className="at-profile-info">
          <h3 className="at-profile-name">{displayName || "New Technician"}</h3>
          <p className="at-profile-role">{displayRole || "Field Technician"}</p>
        </div>

        <label htmlFor="at-photo-upload" className="at-upload-btn">
          <Upload size={15} className="at-upload-btn__icon" />
          <span>Upload photo</span>
          <input
            type="file"
            id="at-photo-upload"
            className="at-hidden-file-input"
            accept="image/*"
          />
        </label>
      </div>

      {/* Account Access Card */}
      <div className="at-card at-access-card">
        <h3 className="at-access-heading">ACCOUNT ACCESS</h3>

        <div className="at-switches-list">
          {/* Mobile app access */}
          <div className="at-switch-row">
            <span className="at-switch-label">Mobile app access</span>
            <button
              type="button"
              role="switch"
              aria-checked={mobileAppAccess}
              className={`at-switch${mobileAppAccess ? " at-switch--active" : ""}`}
              onClick={onToggleMobileAppAccess}
            >
              <span className="at-switch-handle" />
            </button>
          </div>

          {/* View customer info */}
          <div className="at-switch-row">
            <span className="at-switch-label">View customer info</span>
            <button
              type="button"
              role="switch"
              aria-checked={viewCustomerInfo}
              className={`at-switch${viewCustomerInfo ? " at-switch--active" : ""}`}
              onClick={onToggleViewCustomerInfo}
            >
              <span className="at-switch-handle" />
            </button>
          </div>

          {/* Submit job reports */}
          <div className="at-switch-row">
            <span className="at-switch-label">Submit job reports</span>
            <button
              type="button"
              role="switch"
              aria-checked={submitJobReports}
              className={`at-switch${submitJobReports ? " at-switch--active" : ""}`}
              onClick={onToggleSubmitJobReports}
            >
              <span className="at-switch-handle" />
            </button>
          </div>

          {/* View other schedules */}
          <div className="at-switch-row">
            <span className="at-switch-label">View other schedules</span>
            <button
              type="button"
              role="switch"
              aria-checked={viewOtherSchedules}
              className={`at-switch${viewOtherSchedules ? " at-switch--active" : ""}`}
              onClick={onToggleViewOtherSchedules}
            >
              <span className="at-switch-handle" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="at-actions-stack">
        <button
          type="submit"
          id="at-submit-btn"
          className="at-btn at-btn--primary at-btn--full"
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>

        <Link
          href="/admin/technicians"
          className="at-btn at-btn--secondary at-btn--full cursor-pointer"
          aria-label="Cancel adding technician"
        >
          Cancel
        </Link>
      </div>
    </aside>
  );
}
