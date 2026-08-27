"use client";

import MainVacuumUnitsCard from "./MainVacuumUnitsCard";
import FloorPortInventoryCard from "./FloorPortInventoryCard";
import AdditionalFeaturesCard from "./AdditionalFeaturesCard";
import { useGetAdminCustomerEquipmentQuery } from "@/redux/features/api/admin/equipmentApi";
import { mapEquipmentInventory } from "./mapEquipmentInventory";

export default function CustomerEquipmentSection({
  customerId,
}: {
  customerId: string;
}) {
  const { data: equipment, isLoading, isError } =
    useGetAdminCustomerEquipmentQuery(customerId, {
      skip: !customerId,
    });

  const { units, floors, features, isEmpty } = mapEquipmentInventory(
    equipment?.items ?? [],
  );

  if (!customerId) {
    return (
      <p className="cust-profile-empty">
        Select a customer to view equipment and vacuum ports.
      </p>
    );
  }

  if (isLoading) {
    return <p className="cust-profile-empty">Loading equipment...</p>;
  }

  if (isError) {
    return (
      <p className="cust-profile-empty">
        Unable to load equipment for this customer.
      </p>
    );
  }

  return (
    <div className="eq-content-layout">
      {isEmpty && (
        <p className="cust-profile-note">
          No equipment recorded yet. Units and vacuum ports appear here after a
          technician adds them on a service visit.
        </p>
      )}
      <MainVacuumUnitsCard units={units} />
      <FloorPortInventoryCard rows={floors} />
      <AdditionalFeaturesCard features={features} />
    </div>
  );
}
