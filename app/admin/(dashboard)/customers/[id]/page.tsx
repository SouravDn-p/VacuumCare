import type { Metadata } from "next";
import CustomerProfilePageClient from "@/components/admin/customers/CustomerProfilePageClient";

export const metadata: Metadata = {
  title: "Customer profile",
  description:
    "View customer details and the equipment recorded from previous service visits.",
};

export default function CustomerProfilePage() {
  return <CustomerProfilePageClient />;
}
