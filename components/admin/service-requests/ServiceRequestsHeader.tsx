import Link from "next/link";
import { Plus } from "lucide-react";

export default function ServiceRequestsHeader() {
  return (
    <div className="sr-header">
      <div className="sr-header__title-wrap">
        <h1 className="sr-header__title">Service requests</h1>
        <p className="sr-header__subtitle">Manage and track all service requests</p>
      </div>

      <Link
        href="/admin/service-requests/new"
        id="sr-new-request-btn"
        className="sr-new-request-btn"
        aria-label="Create new service request"
      >
        <Plus size={18} strokeWidth={2} className="sr-new-request-btn__icon" />
        <span className="sr-new-request-btn__text">New Request</span>
      </Link>
    </div>
  );
}
