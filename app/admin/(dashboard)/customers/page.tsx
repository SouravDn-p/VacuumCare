import type { Metadata } from "next";
import CustomersHeader from "@/components/admin/customers/CustomersHeader";
import CustomersContainer from "@/components/admin/customers/CustomersContainer";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage and track customer information",
};

export default function CustomersPage() {
  return (
    <div className="cust-page">
      <CustomersHeader />
      <CustomersContainer />
    </div>
  );
}
