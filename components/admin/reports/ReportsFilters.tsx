"use client";

import { ChevronDown } from "lucide-react";

export default function ReportsFilters() {
  return (
    <div className="rpt-filters">
      {/* Date range — native date inputs */}
      <div className="rpt-filters__dates">
        <div className="rpt-date-field">
          <label htmlFor="rpt-from" className="rpt-date-field__label">From</label>
          <input
            id="rpt-from"
            type="date"
            className="rpt-date-input"
            defaultValue="2026-03-01"
          />
        </div>

        <div className="rpt-date-separator" aria-hidden="true" />

        <div className="rpt-date-field">
          <label htmlFor="rpt-to" className="rpt-date-field__label">To</label>
          <input
            id="rpt-to"
            type="date"
            className="rpt-date-input"
            defaultValue="2026-08-01"
          />
        </div>
      </div>

      {/* Dropdowns */}
      <div className="rpt-filters__dropdowns">
        <div className="rpt-dropdown">
          <select id="rpt-filter-tech" className="rpt-dropdown__select" aria-label="Filter by technician">
            <option value="">All Technicians</option>
            <option value="marc">Marc Anderson</option>
            <option value="alex">Alex Martin</option>
            <option value="jordan">Jordan Lee</option>
          </select>
          <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
        </div>

        <div className="rpt-dropdown">
          <select id="rpt-filter-category" className="rpt-dropdown__select" aria-label="Filter by service category">
            <option value="">All Service Categories</option>
            <option value="repair">Repair</option>
            <option value="maintenance">Maintenance</option>
            <option value="installation">Installation</option>
          </select>
          <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
        </div>

        <div className="rpt-dropdown">
          <select id="rpt-filter-payment" className="rpt-dropdown__select" aria-label="Filter by payment status">
            <option value="">All Payment Statuses</option>
            <option value="paid">Paid</option>
            <option value="authorized">Authorized</option>
            <option value="pending">Pending</option>
          </select>
          <ChevronDown size={14} className="rpt-dropdown__chevron" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
