export type RequestStatus =
  | "New"
  | "Under Review"
  | "Quote Sent"
  | "Accepted"
  | "Scheduled"
  | "In Progress"
  | "Report Submitted"
  | "Completed"
  | "Cancelled";

export type RequestTab = "All" | RequestStatus;

export interface ServiceRequestItem {
  id: string;
  requestId: string;
  customerName: string;
  customerSubtext: string;
  service: string;
  submitted: string;
  status: RequestStatus;
  statusLabel: string;
  quoteAmount?: number | null;
  customerNegotiationPrice?: number | null;
  pendingNegotiationId?: string | null;
  canQuote?: boolean;
  canAssign?: boolean;
}

export const STATUS_TABS: RequestTab[] = [
  "All",
  "New",
  "Under Review",
  "Quote Sent",
  "Accepted",
  "Scheduled",
  "In Progress",
  "Report Submitted",
  "Completed",
  "Cancelled",
];

export const SERVICE_REQUESTS_DATA: Record<RequestStatus, ServiceRequestItem[]> = {
  New: [
    {
      id: "sr-1",
      requestId: "SR-1052",
      customerName: "Sarah Johnson",
      customerSubtext: "Low suction",
      service: "Clogged system",
      submitted: "July 31, 2026 · 4:02 PM",
      status: "New",
      statusLabel: "New Request",
    },
  ],
  "Under Review": [
    {
      id: "sr-2",
      requestId: "SR-1052",
      customerName: "Sarah Johnson",
      customerSubtext: "74 Elm Street, Verdun",
      service: "Low suction",
      submitted: "July 31, 2026 · 4:02 PM",
      status: "Under Review",
      statusLabel: "Under review",
    },
    {
      id: "sr-3",
      requestId: "SR-1052",
      customerName: "Sarah Johnson",
      customerSubtext: "74 Elm Street, Verdun",
      service: "Low suction",
      submitted: "July 31, 2026 · 4:02 PM",
      status: "Under Review",
      statusLabel: "Under review",
    },
  ],
  "Quote Sent": [],
  Accepted: [],
  Scheduled: [
    {
      id: "sr-4",
      requestId: "SR-1052",
      customerName: "Sarah Johnson",
      customerSubtext: "Low suction",
      service: "Annual maintenance",
      submitted: "July 31, 2026 · 4:02 PM",
      status: "Scheduled",
      statusLabel: "Scheduled",
    },
  ],
  "In Progress": [],
  "Report Submitted": [],
  Completed: [
    {
      id: "sr-5",
      requestId: "SR-1049",
      customerName: "Michael Brown",
      customerSubtext: "Annual maintenance",
      service: "Annual maintenance",
      submitted: "July 28, 2026 · 11:30 AM",
      status: "Completed",
      statusLabel: "Completed",
    },
  ],
  Cancelled: [],
};
