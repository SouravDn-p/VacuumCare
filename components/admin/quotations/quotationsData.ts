export type QuotationTab =
  | "All"
  | "Draft"
  | "Sent"
  | "Viewed"
  | "Accepted"
  | "Rejected"
  | "Expired"
  | "Cancelled";

export type QuotationStatus =
  | "Draft"
  | "Sent"
  | "Viewed"
  | "Accepted"
  | "Rejected"
  | "Expired"
  | "Cancelled";

export interface QuotationItem {
  id: string;
  quoteId: string;
  customer: string;
  service: string;
  amount: string;
  sentDate: string;
  expiresDate: string;
  status: QuotationStatus;
}

export const QUOTATION_TABS: QuotationTab[] = [
  "All",
  "Draft",
  "Sent",
  "Viewed",
  "Accepted",
  "Rejected",
  "Expired",
  "Cancelled",
];

export const QUOTATIONS_LIST: QuotationItem[] = [
  {
    id: "qt-1",
    quoteId: "QT-2048",
    customer: "Sarah Thompson",
    service: "Central Vacuum Repair",
    amount: "$245.00",
    sentDate: "------",
    expiresDate: "------",
    status: "Draft",
  },
  {
    id: "qt-2",
    quoteId: "QT-2048",
    customer: "Sarah Thompson",
    service: "Central Vacuum Repair",
    amount: "$245.00",
    sentDate: "August 1, 2026",
    expiresDate: "August 2, 2026",
    status: "Accepted",
  },
  {
    id: "qt-3",
    quoteId: "QT-2049",
    customer: "David Chen",
    service: "Inlet Valve Replacement",
    amount: "$180.00",
    sentDate: "August 2, 2026",
    expiresDate: "August 9, 2026",
    status: "Sent",
  },
  {
    id: "qt-4",
    quoteId: "QT-2050",
    customer: "Amelia Roberts",
    service: "System Performance Inspection",
    amount: "$120.00",
    sentDate: "August 1, 2026",
    expiresDate: "August 8, 2026",
    status: "Viewed",
  },
  {
    id: "qt-5",
    quoteId: "QT-2047",
    customer: "John Miller",
    service: "Motor Unit Upgrade",
    amount: "$450.00",
    sentDate: "July 25, 2026",
    expiresDate: "July 31, 2026",
    status: "Expired",
  },
  {
    id: "qt-6",
    quoteId: "QT-2046",
    customer: "Emma Watson",
    service: "Piping Cleansing & Maintenance",
    amount: "$195.00",
    sentDate: "July 20, 2026",
    expiresDate: "July 27, 2026",
    status: "Rejected",
  },
  {
    id: "qt-7",
    quoteId: "QT-2045",
    customer: "Robert Downey",
    service: "New Inlet Line Extension",
    amount: "$320.00",
    sentDate: "July 18, 2026",
    expiresDate: "July 25, 2026",
    status: "Cancelled",
  },
];
