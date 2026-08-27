import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AddTechnicianHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AddTechnicianHeader({
  title = "Add Technician",
  subtitle = "Add a new field technician to your team.",
}: AddTechnicianHeaderProps) {
  return (
    <div className="at-header">
      <Link href="/admin/technicians" className="at-back-link">
        <ArrowLeft size={16} className="at-back-link__icon" />
        <span>Back to technicians</span>
      </Link>
      <div className="at-header__title-wrap">
        <h1 className="at-header__title">{title}</h1>
        <p className="at-header__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
