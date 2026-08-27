export interface VacuumUnit {
  id: string;
  unitNumber: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
}

export interface FloorPortInventory {
  id: string;
  floor: string;
  hdh: string;
  chameleon: string;
  chameleonElite: string;
  standard: string;
  total: string;
  isTotalRow?: boolean;
}

export interface AdditionalFeature {
  id: string;
  type: string;
  quantity: string;
  location: string;
}

export const MAIN_VACUUM_UNITS: VacuumUnit[] = [
  {
    id: "unit-1",
    unitNumber: "01",
    manufacturer: "Beam",
    model: "SC375",
    serialNumber: "BMC-482091",
    location: "Basement utility room",
  },
];

export const FLOOR_PORT_INVENTORY: FloorPortInventory[] = [
  {
    id: "floor-1",
    floor: "Basement",
    hdh: "01",
    chameleon: "----",
    chameleonElite: "----",
    standard: "02",
    total: "03",
  },
  {
    id: "floor-2",
    floor: "First Floor",
    hdh: "00",
    chameleon: "03",
    chameleonElite: "----",
    standard: "04",
    total: "07",
  },
  {
    id: "floor-3",
    floor: "Second Floor",
    hdh: "00",
    chameleon: "----",
    chameleonElite: "02",
    standard: "03",
    total: "05",
  },
  {
    id: "floor-total",
    floor: "Total",
    hdh: "01",
    chameleon: "03",
    chameleonElite: "02",
    standard: "09",
    total: "15",
    isTotalRow: true,
  },
];

export const ADDITIONAL_FEATURES: AdditionalFeature[] = [
  {
    id: "feat-1",
    type: "VacPan",
    quantity: "01",
    location: "Kitchen",
  },
  {
    id: "feat-2",
    type: "Spot Vacuum",
    quantity: "01",
    location: "Kitchen",
  },
  {
    id: "feat-3",
    type: "Wally Flex",
    quantity: "01",
    location: "Kitchen",
  },
];
