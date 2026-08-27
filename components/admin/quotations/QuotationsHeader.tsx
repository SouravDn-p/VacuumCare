import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuotationsHeader() {
  return (
    <div className="quote-header">
      <div className="quote-header__title-wrap">
        <h1 className="quote-header__title">Quotations</h1>
        <p className="quote-header__subtitle">
          Create and manage customer quotations
        </p>
      </div>

      <Link
        href="/admin/quotations/new"
        id="quote-add-btn"
        className="quote-add-btn cursor-pointer"
        aria-label="Create new quotation"
      >
        <Plus size={18} strokeWidth={2} className="quote-add-btn__icon" />
        <span className="quote-add-btn__text">Create quotation</span>
      </Link>
    </div>
  );
}

