"use client";

import { useState } from "react";

export default function NotificationSettingsForm() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form className="set-card" onSubmit={handleSubmit}>
      <h2 className="set-card__title">Notification Preferences</h2>

      <div className="set-form-grid">
        <div className="set-field-group">
          <label htmlFor="set-admin-email" className="set-field-label">
            Admin alert email
          </label>
          <input
            type="email"
            id="set-admin-email"
            className="set-input"
            placeholder="admin@centralcare.com"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-sms-phone" className="set-field-label">
            Emergency SMS alerts phone
          </label>
          <input
            type="text"
            id="set-sms-phone"
            className="set-input"
            placeholder="(514) 555-0199"
          />
        </div>

        <div className="set-field-group">
          <label htmlFor="set-order-alerts" className="set-field-label">
            New order alerts
          </label>
          <select id="set-order-alerts" className="set-select" defaultValue="instant">
            <option value="instant">Instant email notification</option>
            <option value="daily">Daily digest</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div className="set-field-group">
          <label htmlFor="set-service-alerts" className="set-field-label">
            Technician report submissions
          </label>
          <select id="set-service-alerts" className="set-select" defaultValue="instant">
            <option value="instant">Instant email notification</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <div className="set-form-actions">
        <button
          type="submit"
          id="set-save-notif-settings-btn"
          className="set-save-btn"
          aria-label="Save notification preferences"
        >
          {isSaved ? "Saved successfully!" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
