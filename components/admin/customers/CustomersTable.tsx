"use client";

import { Fragment, useEffect, useState } from "react";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { type CustomerItem } from "./customersData";
import type {
  AdminCustomerDetail,
  AdminUpdateCustomerBody,
} from "@/types/admin/customers";

interface CustomersTableProps {
  customers: CustomerItem[];
  expandedId?: string | null;
  expandedMode?: "profile" | "edit" | null;
  detail?: AdminCustomerDetail;
  saving?: boolean;
  onProfile?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSave?: (id: string, body: AdminUpdateCustomerBody) => void;
}

export default function CustomersTable({
  customers,
  expandedId,
  expandedMode,
  detail,
  saving,
  onProfile,
  onEdit,
  onSave,
}: CustomersTableProps) {
  return (
    <div className="cust-table-card">
      <div className="cust-table-scroll">
        <table className="cust-table" aria-label="Customers list">
          <thead>
            <tr>
              <th className="cust-table__th" scope="col">Customer</th>
              <th className="cust-table__th" scope="col">Email</th>
              <th className="cust-table__th" scope="col">Phone</th>
              <th className="cust-table__th" scope="col">Requests</th>
              <th className="cust-table__th" scope="col">Orders</th>
              <th className="cust-table__th" scope="col">Since</th>
              <th className="cust-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="cust-table__empty-cell">
                  <p className="cust-table__empty-text">No customers found.</p>
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <Fragment key={cust.id}>
                  <tr className="cust-table__tr">
                    <td className="cust-table__td cust-table__td--name">
                      {cust.name}
                    </td>
                    <td className="cust-table__td cust-table__td--email">
                      {cust.email}
                    </td>
                    <td className="cust-table__td cust-table__td--phone">
                      {cust.phone}
                    </td>
                    <td className="cust-table__td cust-table__td--requests">
                      {cust.requests}
                    </td>
                    <td className="cust-table__td cust-table__td--orders">
                      {cust.orders}
                    </td>
                    <td className="cust-table__td cust-table__td--since">
                      {cust.since}
                    </td>
                    <td className="cust-table__td cust-table__td--action">
                      <div className="cust-actions-cell admin-btn-row">
                        <AdminActionButton
                          variant="ghost"
                          onClick={() => onProfile?.(cust.id)}
                        >
                          Profile
                        </AdminActionButton>
                        <AdminActionButton
                          variant="secondary"
                          onClick={() => onEdit?.(cust.id)}
                        >
                          Edit
                        </AdminActionButton>
                      </div>
                    </td>
                  </tr>
                  {expandedId === cust.id && (
                    <tr key={`${cust.id}-details`} className="cust-table__tr">
                      <td colSpan={7} className="cust-table__td">
                        {expandedMode === "edit" && detail?.id === cust.id ? (
                          <CustomerEditForm
                            detail={detail}
                            saving={saving}
                            onSave={(body) => onSave?.(cust.id, body)}
                          />
                        ) : (
                          <CustomerProfile detail={detail} />
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerProfile({ detail }: { detail?: AdminCustomerDetail }) {
  if (!detail) {
    return <p className="cust-table__empty-text">Loading profile...</p>;
  }

  const primary = detail.addresses.find((address) => address.isPrimary) ?? detail.addresses[0];

  return (
    <div className="sr-customer-cell">
      <span className="sr-customer-cell__name">
        {detail.firstName} {detail.lastName}
        {detail.company ? ` · ${detail.company}` : ""}
      </span>
      <span className="sr-customer-cell__subtext">
        {detail.email} · {detail.phone || "No phone"} ·{" "}
        {detail.isActive ? "Active" : "Inactive"}
        {primary
          ? ` · ${primary.line1}, ${primary.city}, ${primary.state} ${primary.zipCode}`
          : ""}
      </span>
    </div>
  );
}

function CustomerEditForm({
  detail,
  saving,
  onSave,
}: {
  detail: AdminCustomerDetail;
  saving?: boolean;
  onSave: (body: AdminUpdateCustomerBody) => void;
}) {
  const [firstName, setFirstName] = useState(detail.firstName);
  const [lastName, setLastName] = useState(detail.lastName);
  const [phone, setPhone] = useState(detail.phone ?? "");
  const [company, setCompany] = useState(detail.company ?? "");

  useEffect(() => {
    setFirstName(detail.firstName);
    setLastName(detail.lastName);
    setPhone(detail.phone ?? "");
    setCompany(detail.company ?? "");
  }, [detail]);

  return (
    <div className="cust-edit-form">
      <span className="cust-edit-form__title">Edit customer</span>
      <div className="cust-edit-grid">
        <input
          className="cust-search-box__input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-label="First name"
          placeholder="First name"
        />
        <input
          className="cust-search-box__input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          aria-label="Last name"
          placeholder="Last name"
        />
        <input
          className="cust-search-box__input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-label="Phone"
          placeholder="Phone"
        />
        <input
          className="cust-search-box__input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-label="Company"
          placeholder="Company"
        />
      </div>
      <div className="cust-edit-form__actions">
        <AdminActionButton
          variant="primary"
          disabled={saving}
          disabledReason={saving ? "These customer changes are still being saved." : undefined}
          onClick={() =>
            onSave({
              firstName,
              lastName,
              phone,
              company,
            })
          }
        >
          {saving ? "Saving..." : "Save changes"}
        </AdminActionButton>
      </div>
    </div>
  );
}
