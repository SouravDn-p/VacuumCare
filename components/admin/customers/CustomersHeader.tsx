"use client";

import toast from "react-hot-toast";
import { Plus } from "lucide-react";

export default function CustomersHeader() {
  return (
    <div className="cust-header">
      <div className="cust-header__title-wrap">
        <h1 className="cust-header__title">Customers</h1>
        <p className="cust-header__subtitle">Manage and track customer information</p>
      </div>

      <button
        id="cust-add-btn"
        className="cust-add-btn cursor-pointer"
        aria-label="Add new customer"
        type="button"
        onClick={() =>
          toast(
            "Customers create their own accounts. Use Profile or Edit to manage an existing customer.",
          )
        }
      >
        <Plus size={18} strokeWidth={2} className="cust-add-btn__icon" />
        <span className="cust-add-btn__text">Add customer</span>
      </button>
    </div>
  );
}
