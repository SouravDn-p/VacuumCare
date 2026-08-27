import Link from "next/link";
import { Plus } from "lucide-react";

export default function TechniciansHeader() {
  return (
    <div className="tech-header">
      <div className="tech-header__title-wrap">
        <h1 className="tech-header__title">Technicians</h1>
        <p className="tech-header__subtitle">Manage and monitor your service technicians</p>
      </div>

      <Link
        href="/admin/technicians/new"
        id="tech-add-btn"
        className="tech-add-btn"
        aria-label="Add new technician"
      >
        <Plus size={18} strokeWidth={2} className="tech-add-btn__icon" />
        <span className="tech-add-btn__text">Add Technician</span>
      </Link>
    </div>
  );
}
