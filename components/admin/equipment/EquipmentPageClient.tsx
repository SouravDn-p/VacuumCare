"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import EquipmentHeader from "./EquipmentHeader";
import CustomerEquipmentSection from "./CustomerEquipmentSection";
import {
  useGetAdminCustomerByIdQuery,
  useGetAdminCustomersQuery,
} from "@/redux/features/api/admin/customersApi";

export default function EquipmentPageClient() {
  return (
    <Suspense fallback={<p className="cust-profile-empty">Loading equipment...</p>}>
      <EquipmentPageContent />
    </Suspense>
  );
}

function EquipmentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("customerId") ?? "";
  const { data: customers } = useGetAdminCustomersQuery({ pageSize: 100 });
  const selectedId = queryId || customers?.items[0]?.id || "";
  const selected = customers?.items.find((item) => item.id === selectedId);
  const { data: detail } = useGetAdminCustomerByIdQuery(selectedId, {
    skip: !selectedId,
  });

  const customerName = selected
    ? `${selected.firstName} ${selected.lastName}`
    : detail
      ? `${detail.firstName} ${detail.lastName}`
      : "Select a customer";

  return (
    <div className="eq-page">
      <EquipmentHeader customerName={customerName}>
        <select
          className="eq-customer-select"
          value={selectedId}
          onChange={(event) => {
            router.replace(
              `/admin/equipment?customerId=${event.target.value}`,
              { scroll: false },
            );
          }}
          aria-label="Select customer"
        >
          {(customers?.items ?? []).map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
        {selectedId ? (
          <Link href={`/admin/customers/${selectedId}`} className="eq-profile-link">
            View profile
          </Link>
        ) : null}
      </EquipmentHeader>
      <CustomerEquipmentSection customerId={selectedId} />
    </div>
  );
}
