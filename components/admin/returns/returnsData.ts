export interface ReturnRequestItem {
  id: string;
  technician: {
    initials: string;
    name: string;
    role: string;
  };
  status: "Pending approval" | "Approved" | "Rejected" | "Completed";
  orderNumber: string;
  product: string;
  reason: string;
}

export const RETURN_REQUESTS_LIST: ReturnRequestItem[] = [
  {
    id: "ret-1",
    technician: {
      initials: "MA",
      name: "Marc Anderson",
      role: "Field Technician",
    },
    status: "Pending approval",
    orderNumber: "CC-3084",
    product: "HEPA Exhaust Filter",
    reason: "Received wrong product variant",
  },
  {
    id: "ret-2",
    technician: {
      initials: "MA",
      name: "Marc Anderson",
      role: "Field Technician",
    },
    status: "Pending approval",
    orderNumber: "CC-3084",
    product: "HEPA Exhaust Filter",
    reason: "Received wrong product variant",
  },
];
