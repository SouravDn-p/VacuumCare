import { Plus } from "lucide-react";

export default function OrdersHeader() {
  return (
    <div className="ord-header">
      <div className="ord-header__title-wrap">
        <h1 className="ord-header__title">Orders</h1>
        <p className="ord-header__subtitle">Manage and organize your orders</p>
      </div>

      <button
        id="ord-add-btn"
        className="ord-add-btn"
        aria-label="Add new order"
      >
        <Plus size={18} strokeWidth={2} className="ord-add-btn__icon" />
        <span className="ord-add-btn__text">Add order</span>
      </button>
    </div>
  );
}
