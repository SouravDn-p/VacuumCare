"use client";

import { FormEvent, useEffect, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
} from "@/redux/features/api/admin/settingsApi";

export default function BusinessSettingsForm() {
  const { data } = useGetAdminSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateAdminSettingsMutation();
  const [businessName, setBusinessName] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    if (!data) return;
    setBusinessName(data.businessName ?? "");
    setOfficePhone(data.officePhone ?? "");
    setSupportEmail(data.supportEmail ?? "");
    setBusinessAddress(data.businessAddress ?? "");
    setServiceArea(data.serviceArea ?? "");
  }, [data]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await updateSettings({
        businessName,
        officePhone,
        supportEmail,
        businessAddress,
        serviceArea,
        logo,
      }).unwrap();
      setLogo(null);
      toast.success("Settings saved");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not save settings"));
    }
  };

  return (
    <form className="set-card" onSubmit={handleSubmit}>
      <h2 className="set-card__title">Business Settings</h2>
      <div className="set-form-grid">
        <div className="set-field-group">
          <label htmlFor="set-business-name" className="set-field-label">
            Business name
          </label>
          <input
            type="text"
            id="set-business-name"
            className="set-input"
            placeholder="CentralCare"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>
        <div className="set-field-group">
          <label htmlFor="set-office-phone" className="set-field-label">
            Office phone number
          </label>
          <input
            type="text"
            id="set-office-phone"
            className="set-input"
            placeholder="(514) 555-0100"
            value={officePhone}
            onChange={(event) => setOfficePhone(event.target.value)}
          />
        </div>
        <div className="set-field-group">
          <label htmlFor="set-support-email" className="set-field-label">
            Support email
          </label>
          <input
            type="email"
            id="set-support-email"
            className="set-input"
            placeholder="support@centralcare.com"
            value={supportEmail}
            onChange={(event) => setSupportEmail(event.target.value)}
          />
        </div>
        <div className="set-field-group">
          <label htmlFor="set-business-address" className="set-field-label">
            Business address
          </label>
          <input
            type="text"
            id="set-business-address"
            className="set-input"
            placeholder="100 Commerce Blvd, Montreal, QC"
            value={businessAddress}
            onChange={(event) => setBusinessAddress(event.target.value)}
          />
        </div>
      </div>
      <div className="set-field-group">
        <label htmlFor="set-service-area" className="set-field-label">
          Service area
        </label>
        <textarea
          id="set-service-area"
          className="set-textarea"
          rows={3}
          placeholder="Greater Montreal Area, South Shore, North Shore, Laval"
          value={serviceArea}
          onChange={(event) => setServiceArea(event.target.value)}
        />
      </div>
      <div className="set-logo-section">
        <label className="set-field-label">Logo</label>
        <div className="set-logo-row">
          <div className="set-logo-preview" aria-hidden="true">
            {data?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt="" className="set-logo-preview__image" />
            ) : (
              <span className="set-logo-preview__text">Logo</span>
            )}
          </div>
          <label htmlFor="set-logo-upload-input" className="set-upload-btn">
            <Upload size={16} className="set-upload-btn__icon" />
            <span>{logo ? logo.name : "Upload logo"}</span>
            <input
              type="file"
              id="set-logo-upload-input"
              className="set-hidden-file-input"
              accept="image/*"
              onChange={(event) => setLogo(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>
      <div className="set-form-actions">
        <button
          type="submit"
          id="set-save-btn"
          className="set-save-btn"
          aria-label="Save settings"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save settings"}
        </button>
      </div>
    </form>
  );
}
