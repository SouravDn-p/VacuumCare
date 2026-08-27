import { Suspense } from "react";
import type { Metadata } from "next";
import AddTechnicianContainer from "@/components/admin/technicians/create/AddTechnicianContainer";

export const metadata: Metadata = {
  title: "Add Technician",
  description: "Add and configure a new field technician profile and access privileges",
};

export default function AddTechnicianPage() {
  return (
    <Suspense>
      <AddTechnicianContainer />
    </Suspense>
  );
}
