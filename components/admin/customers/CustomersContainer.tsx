"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomersSearch from "./CustomersSearch";
import CustomersTable from "./CustomersTable";
import {
  useGetAdminCustomerByIdQuery,
  useGetAdminCustomersQuery,
  useUpdateAdminCustomerMutation,
} from "@/redux/features/api/admin/customersApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { AdminUpdateCustomerBody } from "@/types/admin/customers";
import type { CustomerItem } from "./customersData";
import AdminSubmitOverlay from "@/components/admin/ui/AdminSubmitOverlay";

export default function CustomersContainer() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedMode, setExpandedMode] = useState<"profile" | "edit" | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useGetAdminCustomersQuery({
    page: 1,
    pageSize: 100,
    search: debouncedQuery || undefined,
  });
  const { data: detail } = useGetAdminCustomerByIdQuery(expandedId ?? "", {
    skip: !expandedId,
  });
  const [updateCustomer, { isLoading: isSaving }] =
    useUpdateAdminCustomerMutation();

  const customers: CustomerItem[] = (data?.items ?? []).map((item) => ({
    id: item.id,
    name: `${item.firstName} ${item.lastName}`.trim(),
    email: item.email,
    phone: item.phone || "—",
    requests: String(item.requestCount).padStart(2, "0"),
    orders: String(item.orderCount).padStart(2, "0"),
    since: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const toggleRow = (id: string, mode: "profile" | "edit") => {
    if (expandedId === id && expandedMode === mode) {
      setExpandedId(null);
      setExpandedMode(null);
      return;
    }
    setExpandedId(id);
    setExpandedMode(mode);
  };

  const handleSave = async (id: string, body: AdminUpdateCustomerBody) => {
    try {
      await updateCustomer({ id, body }).unwrap();
      toast.success("Customer updated.");
      setExpandedMode("profile");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update this customer."));
    }
  };

  return (
    <div className="cust-content-layout">
      <CustomersSearch query={query} onQueryChange={setQuery} />
      <CustomersTable
        customers={isLoading ? [] : customers}
        expandedId={expandedId}
        expandedMode={expandedMode}
        detail={detail}
        saving={isSaving}
        onProfile={(id) => toggleRow(id, "profile")}
        onEdit={(id) => toggleRow(id, "edit")}
        onSave={handleSave}
      />
      <AdminSubmitOverlay open={isSaving} message="Saving customer..." />
    </div>
  );
}
