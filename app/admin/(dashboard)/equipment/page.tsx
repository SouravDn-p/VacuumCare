import type { Metadata } from "next";
import EquipmentPageClient from "@/components/admin/equipment/EquipmentPageClient";

export const metadata: Metadata = {
  title: "Equipment & Vacuum Ports",
  description: "View and manage customer vacuum units, port inventory, and additional features.",
};

export default function EquipmentPage() {
  return <EquipmentPageClient />;
}
