"use client";

import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  onAdd?: () => void;
}

export default function ProductsHeader({ onAdd }: ProductsHeaderProps) {
  return (
    <div className="prod-header">
      <div className="prod-header__title-wrap">
        <h1 className="prod-header__title">Products</h1>
        <p className="prod-header__subtitle">Manage and organize your products</p>
      </div>

      <button
        id="prod-add-btn"
        className="prod-add-btn cursor-pointer"
        aria-label="Add new product"
        type="button"
        onClick={onAdd}
      >
        <Plus size={18} strokeWidth={2} className="prod-add-btn__icon" />
        <span className="prod-add-btn__text">Add product</span>
      </button>
    </div>
  );
}
