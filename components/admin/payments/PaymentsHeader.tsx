"use client";

import toast from "react-hot-toast";
import { Plus } from "lucide-react";

export default function PaymentsHeader() {
  return (
    <div className="pay-header">
      <div className="pay-header__title-wrap">
        <h1 className="pay-header__title">Payments</h1>
        <p className="pay-header__subtitle">View payment transactions and details</p>
      </div>

      <button
        id="pay-add-btn"
        className="pay-add-btn cursor-pointer"
        aria-label="Add new payment"
        type="button"
        onClick={() =>
          toast("Payments are created through Stripe checkout, not added manually.")
        }
      >
        <Plus size={18} strokeWidth={2} className="pay-add-btn__icon" />
        <span className="pay-add-btn__text">Add payment</span>
      </button>
    </div>
  );
}
