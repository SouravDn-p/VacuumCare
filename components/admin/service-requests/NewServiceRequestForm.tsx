"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Paperclip,
  ChevronDown,
  Plus,
} from "lucide-react";

const SERVICE_TYPES = [
  "Low suction",
  "Broken inlet valve",
  "Clogged system",
  "Annual maintenance",
  "Motor issues",
  "Filter replacement",
  "New installation",
  "Leak repair",
  "Other",
];

const PREFERRED_TIMES = [
  "Any time",
  "Morning (8 AM – 12 PM)",
  "Afternoon (12 PM – 5 PM)",
  "Evening (5 PM – 8 PM)",
];

const TECHNICIANS = [
  "Assign later",
  "Marc Anderson",
  "Alex Martin",
  "Jordan Lee",
];

const NEXT_STEPS = [
  "Request is logged as New",
  "Admin reviews and moves to Under review",
  "Quotation is created and sent",
  "Customer accepts — service is scheduled",
  "Technician completes and submits report",
  "Payment is captured",
];

export default function NewServiceRequestForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/service-requests");
  };

  return (
    <form className="nsr-form" onSubmit={handleSubmit}>
      {/* ── Top Navigation / Title ── */}
      <div className="nsr-header">
        <Link href="/admin/service-requests" className="nsr-back-link">
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Back to service requests</span>
        </Link>
        <h1 className="nsr-title">New Service Request</h1>
        <p className="nsr-subtitle">
          Create a new request on behalf of a customer or from a walk-in.
        </p>
      </div>

      {/* ── 2-Column Grid Layout ── */}
      <div className="nsr-layout-grid">
        {/* Left Column: Form Cards */}
        <div className="nsr-main-col">
          {/* Card 1: Customer Information */}
          <div className="nsr-card">
            <h2 className="nsr-card__title">Customer Information</h2>

            <div className="nsr-grid-2">
              <div className="nsr-field">
                <label htmlFor="nsr-first-name" className="nsr-label">
                  First name
                </label>
                <input
                  id="nsr-first-name"
                  type="text"
                  className="nsr-input"
                  placeholder="Sarah"
                />
              </div>

              <div className="nsr-field">
                <label htmlFor="nsr-last-name" className="nsr-label">
                  Last name
                </label>
                <input
                  id="nsr-last-name"
                  type="text"
                  className="nsr-input"
                  placeholder="Thompson"
                />
              </div>
            </div>

            <div className="nsr-grid-2">
              <div className="nsr-field">
                <label htmlFor="nsr-email" className="nsr-label">
                  Email address
                </label>
                <input
                  id="nsr-email"
                  type="email"
                  className="nsr-input"
                  placeholder="sarah@example.com"
                />
              </div>

              <div className="nsr-field">
                <label htmlFor="nsr-phone" className="nsr-label">
                  Phone number
                </label>
                <input
                  id="nsr-phone"
                  type="tel"
                  className="nsr-input"
                  placeholder="(514) 555-0000"
                />
              </div>
            </div>

            <div className="nsr-grid-2">
              <div className="nsr-field">
                <label htmlFor="nsr-address" className="nsr-label">
                  Service address
                </label>
                <input
                  id="nsr-address"
                  type="text"
                  className="nsr-input"
                  placeholder="1842 Maplewood Drive"
                />
              </div>

              <div className="nsr-field">
                <label htmlFor="nsr-city" className="nsr-label">
                  City / Region
                </label>
                <input
                  id="nsr-city"
                  type="text"
                  className="nsr-input"
                  placeholder="Westmount, QC"
                />
              </div>
            </div>

            <div className="nsr-link-account-wrap">
              <button type="button" className="nsr-link-account-btn">
                <Plus size={14} strokeWidth={2} />
                <span>Link to existing customer account</span>
              </button>
            </div>
          </div>

          {/* Card 2: Request Details */}
          <div className="nsr-card">
            <h2 className="nsr-card__title">Request Details</h2>

            <div className="nsr-field">
              <label htmlFor="nsr-service-type" className="nsr-label">
                Service type
              </label>
              <div className="nsr-select-wrap">
                <select id="nsr-service-type" className="nsr-select" defaultValue="">
                  <option value="">Select service type...</option>
                  {SERVICE_TYPES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="nsr-select-chevron" strokeWidth={2} />
              </div>
            </div>

            <div className="nsr-grid-2">
              <div className="nsr-field">
                <label htmlFor="nsr-pref-date" className="nsr-label">
                  Preferred date
                </label>
                <input
                  id="nsr-pref-date"
                  type="date"
                  className="nsr-input"
                />
              </div>

              <div className="nsr-field">
                <label htmlFor="nsr-pref-time" className="nsr-label">
                  Preferred time
                </label>
                <div className="nsr-select-wrap">
                  <select id="nsr-pref-time" className="nsr-select" defaultValue="Any time">
                    {PREFERRED_TIMES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="nsr-select-chevron" strokeWidth={2} />
                </div>
              </div>
            </div>

            <div className="nsr-field">
              <label htmlFor="nsr-desc" className="nsr-label">
                Problem description
              </label>
              <textarea
                id="nsr-desc"
                className="nsr-textarea"
                rows={4}
                placeholder="Describe the issue in detail. Include which floors or areas are affected, when it started, and any relevant observations."
              />
            </div>
          </div>

          {/* Card 3: Attachments */}
          <div className="nsr-card">
            <h2 className="nsr-card__title">Attachments</h2>

            <div className="nsr-dropzone">
              <input
                id="nsr-file-input"
                type="file"
                className="nsr-dropzone__input"
                accept="image/jpeg,image/png,video/mp4"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedFile(file.name);
                }}
              />
              <label htmlFor="nsr-file-input" className="nsr-dropzone__content">
                <div className="nsr-dropzone__icon-circle">
                  <Paperclip size={20} strokeWidth={1.8} className="nsr-dropzone__icon" />
                </div>
                <p className="nsr-dropzone__main-text">
                  {selectedFile ? selectedFile : "Drop photos or videos here"}
                </p>
                <p className="nsr-dropzone__sub-text">
                  JPG, PNG, MP4 up to 50 MB each
                </p>
                <span className="nsr-dropzone__browse-btn">
                  Browse files
                </span>
              </label>
            </div>
          </div>

          {/* Card 4: Internal Notes */}
          <div className="nsr-card">
            <h2 className="nsr-card__title">Internal Notes</h2>
            <textarea
              id="nsr-internal-notes"
              className="nsr-textarea"
              rows={3}
              placeholder="Add an internal note visible only to admin and technicians..."
            />
          </div>
        </div>

        {/* Right Column: Sidebar Actions & Info */}
        <div className="nsr-sidebar-col">
          {/* Next Steps Card */}
          <div className="nsr-sidebar-card">
            <h3 className="nsr-sidebar-card__heading">NEXT STEPS</h3>
            <ol className="nsr-steps-list">
              {NEXT_STEPS.map((step, idx) => (
                <li key={idx} className="nsr-step-item">
                  <span className="nsr-step-item__num">{idx + 1}</span>
                  <span className="nsr-step-item__text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Assign Technician Card */}
          <div className="nsr-sidebar-card">
            <h3 className="nsr-sidebar-card__heading">ASSIGN TECHNICIAN</h3>
            <div className="nsr-select-wrap">
              <select id="nsr-assign-tech" className="nsr-select" defaultValue="Assign later">
                {TECHNICIANS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="nsr-select-chevron" strokeWidth={2} />
            </div>
          </div>

          {/* Submit & Cancel Actions */}
          <div className="nsr-actions-card">
            <button type="submit" id="nsr-submit-btn" className="nsr-btn nsr-btn--primary">
              Submit request
            </button>
            <Link
              href="/admin/service-requests"
              id="nsr-cancel-btn"
              className="nsr-btn nsr-btn--secondary"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
