import type { Metadata } from "next";
import TechniciansHeader from "@/components/admin/technicians/TechniciansHeader";
import TechniciansContainer from "@/components/admin/technicians/TechniciansContainer";

export const metadata: Metadata = {
  title: "Technicians",
  description: "Manage and monitor your service technicians",
};

export default function TechniciansPage() {
  return (
    <div className="tech-page">
      <TechniciansHeader />
      <TechniciansContainer />
    </div>
  );
}
