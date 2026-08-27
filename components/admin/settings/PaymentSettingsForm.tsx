"use client";

import { useState } from "react";

export default function PaymentSettingsForm() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form className="set-card" onSubmit={handleSubmit}>
      <h2 className="set-card__title">Payment &amp; Gateway Settings</h2>

      <div className="set-form-grid">
        <div className="set-field-group">
          <label htmlFor="set-stripe-pub-key" className="set-field-label">
            Stripe publishable key
          </label>
          <input
            type="text"
            id="set-stripe-pub-key"
            className="set-input"
            placeholder="pk_live_51Ny..."
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-currency" className="set-field-label">
            Store currency
          </label>
          <input
            type="text"
            id="set-currency"
            className="set-input"
            placeholder="CAD ($)"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-tax-rate" className="set-field-label">
            Default tax rate (%)
          </label>
          <input
            type="text"
            id="set-tax-rate"
            className="set-input"
            placeholder="14.975"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-cod-toggle" className="set-field-label">
            Cash on delivery (COD)
          </label>
          <select id="set-cod-toggle" className="set-select" defaultValue="enabled">
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <div className="set-form-actions">
        <button
          type="submit"
          id="set-save-payment-btn"
          className="set-save-btn"
          aria-label="Save payment settings"
        >
          {isSaved ? "Saved successfully!" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
