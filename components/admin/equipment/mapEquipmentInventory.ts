import type { AdminEquipmentItem } from "@/redux/features/api/admin/equipmentApi";
import type {
  AdditionalFeature,
  FloorPortInventory,
  VacuumUnit,
} from "./equipmentData";

export function mapEquipmentInventory(items: AdminEquipmentItem[] = []) {
  const units: VacuumUnit[] = items.map((item) => ({
    id: item.id,
    unitNumber: item.unitNumber,
    manufacturer: item.manufacturer || "—",
    model: item.model || "—",
    serialNumber: item.serialNumber || "—",
    location: item.location || "—",
  }));

  const rows = new Map<string, FloorPortInventory>();
  for (const item of items) {
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
      else if (type.includes("elite"))
        current.chameleonElite = String(inlet.quantity).padStart(2, "0");
      else if (type.includes("chameleon"))
        current.chameleon = String(inlet.quantity).padStart(2, "0");
      else current.standard = String(inlet.quantity).padStart(2, "0");
      rows.set(inlet.floor, current);
    }
  }

  const floors: FloorPortInventory[] = [...rows.values()].map((row) => {
    const total =
      Number(row.hdh === "----" ? 0 : row.hdh) +
      Number(row.chameleon === "----" ? 0 : row.chameleon) +
      Number(row.chameleonElite === "----" ? 0 : row.chameleonElite) +
      Number(row.standard === "----" ? 0 : row.standard);
    return { ...row, total: String(total).padStart(2, "0") };
  });

  const features: AdditionalFeature[] = items.flatMap((item) =>
    item.additionalFeatures.map((feature, index) => ({
      id: `${item.id}-${index}`,
      type: feature,
      quantity: "01",
      location: item.location || "—",
    })),
  );

  return { units, floors, features, isEmpty: items.length === 0 };
}
