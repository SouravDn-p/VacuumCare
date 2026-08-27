"use client";

import { useMemo, useState } from "react";
import EquipmentHeader from "./EquipmentHeader";
import MainVacuumUnitsCard from "./MainVacuumUnitsCard";
import FloorPortInventoryCard from "./FloorPortInventoryCard";
import AdditionalFeaturesCard from "./AdditionalFeaturesCard";
import { useGetAdminCustomersQuery } from "@/redux/features/api/admin/customersApi";
import { useGetAdminCustomerEquipmentQuery } from "@/redux/features/api/admin/equipmentApi";
import type { AdditionalFeature, FloorPortInventory, VacuumUnit } from "./equipmentData";

export default function EquipmentPageClient() {
  const { data: customers } = useGetAdminCustomersQuery({ pageSize: 50 });
  const [customerId, setCustomerId] = useState("");
  const selectedId = customerId || customers?.items[0]?.id || "";
  const selected = customers?.items.find((item) => item.id === selectedId);
  const { data: equipment } = useGetAdminCustomerEquipmentQuery(selectedId, {
    skip: !selectedId,
  });

  const units: VacuumUnit[] = (equipment?.items ?? []).map((item) => ({
    id: item.id,
    unitNumber: item.unitNumber,
    manufacturer: item.manufacturer || "—",
    model: item.model || "—",
    serialNumber: item.serialNumber || "—",
    location: item.location || "—",
  }));

  const floors: FloorPortInventory[] = useMemo(() => {
    const rows = new Map<string, FloorPortInventory>();
    for (const item of equipment?.items ?? []) {
      for (const inlet of item.inlets) {
        const current = rows.get(inlet.floor) ?? {
          id: inlet.floor,
          floor: inlet.floor,
          hdh: "00",
          chameleon: "----",
          chameleonElite: "----",
          standard: "00",
          total: "00",
        };
        const type = inlet.type.toLowerCase();
        if (type.includes("hdh")) current.hdh = String(inlet.quantity).padStart(2, "0");
        else if (type.includes("elite")) current.chameleonElite = String(inlet.quantity).padStart(2, "0");
        else if (type.includes("chameleon")) current.chameleon = String(inlet.quantity).padStart(2, "0");
        else current.standard = String(inlet.quantity).padStart(2, "0");
        rows.set(inlet.floor, current);
      }
    }
    return [...rows.values()].map((row) => {
      const total =
        Number(row.hdh === "----" ? 0 : row.hdh) +
        Number(row.chameleon === "----" ? 0 : row.chameleon) +
        Number(row.chameleonElite === "----" ? 0 : row.chameleonElite) +
        Number(row.standard === "----" ? 0 : row.standard);
      return { ...row, total: String(total).padStart(2, "0") };
    });
  }, [equipment?.items]);

  const features: AdditionalFeature[] = (equipment?.items ?? []).flatMap((item) =>
    item.additionalFeatures.map((feature, index) => ({
      id: `${item.id}-${index}`,
      type: feature,
      quantity: "01",
      location: item.location || "—",
    })),
  );

  return (
    <div className="eq-page">
      <EquipmentHeader
        customerName={
          selected
            ? `${selected.firstName} ${selected.lastName}`
            : "Select a customer"
        }
      >
        <select
          className="eq-customer-select"
          value={selectedId}
          onChange={(event) => setCustomerId(event.target.value)}
          aria-label="Select customer"
        >
          {(customers?.items ?? []).map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
      </EquipmentHeader>
      <div className="eq-content-layout">
        <MainVacuumUnitsCard units={units} />
        <FloorPortInventoryCard rows={floors} />
        <AdditionalFeaturesCard features={features} />
      </div>
    </div>
  );
}
