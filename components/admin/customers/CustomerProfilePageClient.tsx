"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CustomerEquipmentSection from "@/components/admin/equipment/CustomerEquipmentSection";
import { useGetAdminCustomerByIdQuery } from "@/redux/features/api/admin/customersApi";

export default function CustomerProfilePageClient() {
  const { id } = useParams<{ id: string }>();
  const { data: detail, isLoading, isError } = useGetAdminCustomerByIdQuery(id, {
    skip: !id,
  });

  const name = detail
    ? `${detail.firstName} ${detail.lastName}`.trim()
    : "Customer profile";
  const primary =
    detail?.addresses.find((address) => address.isPrimary) ??
    detail?.addresses[0];

  return (
    <div className="cust-profile-page">
      <div className="cust-profile-header">
        <div className="cust-profile-header__title-wrap">
          <Link href="/admin/customers" className="cust-profile-back">
            <ArrowLeft size={16} />
            Customers
          </Link>
          <h1 className="cust-profile-header__title">
            {isLoading ? "Loading profile..." : name}
          </h1>
          <p className="cust-profile-header__subtitle">
            Customer details and equipment recorded from previous service visits
          </p>
        </div>
        {id && (
          <Link
            href={`/admin/equipment?customerId=${id}`}
            className="cust-profile-equipment-link"
          >
            Open equipment page
          </Link>
        )}
      </div>

      {isError && (
        <p className="cust-profile-empty">Unable to load this customer.</p>
      )}

      {detail && (
        <section className="cust-profile-card" aria-label="Customer details">
          <div className="cust-profile-grid">
            <ProfileField label="Name" value={name} />
            <ProfileField label="Email" value={detail.email} />
            <ProfileField label="Phone" value={detail.phone || "—"} />
            <ProfileField label="Company" value={detail.company || "—"} />
            <ProfileField
              label="Status"
              value={detail.isActive ? "Active" : "Inactive"}
            />
            <ProfileField
              label="Customer since"
              value={new Date(detail.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
            <ProfileField
              label="Service requests"
              value={String(detail.requestCount)}
            />
            <ProfileField label="Orders" value={String(detail.orderCount)} />
            <ProfileField
              label="Primary address"
              value={
                primary
                  ? [primary.line1, primary.apartment, primary.city, primary.state, primary.zipCode]
                      .filter(Boolean)
                      .join(", ")
                  : "No address on file"
              }
              wide
            />
          </div>
        </section>
      )}

      <section className="cust-profile-equipment" aria-label="Equipment and vacuum ports">
        <div className="cust-profile-equipment__intro">
          <h2 className="cust-profile-equipment__title">Equipment &amp; Vacuum Ports</h2>
          <p className="cust-profile-equipment__copy">
            Vacuum units, floor inlets, and extra features added by technicians
            from this customer&apos;s service requests.
          </p>
        </div>
        {id ? <CustomerEquipmentSection customerId={id} /> : null}
      </section>
    </div>
  );
}

function ProfileField({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`cust-profile-field${wide ? " cust-profile-field--wide" : ""}`}>
      <span className="cust-profile-field__label">{label}</span>
      <span className="cust-profile-field__value">{value}</span>
    </div>
  );
}
