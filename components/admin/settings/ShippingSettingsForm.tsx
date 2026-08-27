"use client";

import { useState } from "react";

export default function ShippingSettingsForm() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form className="set-card" onSubmit={handleSubmit}>
      <h2 className="set-card__title">Shipping &amp; Delivery Settings</h2>

      <div className="set-form-grid">
        <div className="set-field-group">
          <label htmlFor="set-courier" className="set-field-label">
            Primary courier
          </label>
          <select id="set-courier" className="set-select" defaultValue="ups">
            <option value="ups">UPS Ground</option>
            <option value="fedex">FedEx Express</option>
            <option value="canadapost">Canada Post</option>
          </select>
        </div>

        <div className="set-field-group">
          <label htmlFor="set-flat-rate" className="set-field-label">
            Flat rate standard shipping ($)
          </label>
          <input
            type="text"
            id="set-flat-rate"
            className="set-input"
            placeholder="15.00"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-free-shipping" className="set-field-label">
            Free shipping threshold ($)
          </label>
          <input
            type="text"
            id="set-free-shipping"
            className="set-input"
            placeholder="150.00"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-est-delivery" className="set-field-label">
            Estimated delivery time
          </label>
          <input
            type="text"
            id="set-est-delivery"
            className="set-input"
            placeholder="2-4 business days"
          />
        </div>
      </div>

      <div className="set-form-actions">
        <button
          type="submit"
          id="set-save-shipping-btn"
          className="set-save-btn"
          aria-label="Save shipping settings"
        >
          {isSaved ? "Saved successfully!" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
