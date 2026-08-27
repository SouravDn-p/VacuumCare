export interface AdminNotificationItem {
  id: string;
  initials: string;
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  href?: string;
}

export const NOTIFICATIONS_LIST: AdminNotificationItem[] = [
  {
    id: "notif-1",
    initials: "MA",
    title: "New service request received",
    description: "Sarah Thompson submitted SR-1052 for clogged system.",
    timestamp: "2 min ago",
    isUnread: true,
  },
  {
    id: "notif-2",
    initials: "MA",
    title: "New photos uploaded to SR-1048",
    description: "Sarah Thompson uploaded 3 photos and 1 video.",
    timestamp: "18 min ago",
    isUnread: false,
  },
  {
    id: "notif-3",
    initials: "MA",
    title: "Quotation QT-2048 was accepted",
    description: "Sarah Thompson accepted the quotation for $245.00.",
    timestamp: "1 hour ago",
    isUnread: false,
  },
  {
    id: "notif-4",
    initials: "MA",
    title: "Payment authorization completed",
    description: "$245.00 authorized for SR-1048 — Sarah Thompson.",
    timestamp: "1 hour ago",
    isUnread: false,
  },
  {
    id: "notif-5",
    initials: "MA",
    title: "Technician submitted a service report",
    description: "Marc Anderson submitted a report for SR-1048.",
    timestamp: "3 hours ago",
    isUnread: false,
  },
  {
    id: "notif-6",
    initials: "MA",
    title: "UPS shipment delivered",
    description: "Order CC-3084 for Sarah Thompson has been delivered.",
    timestamp: "Yesterday",
    isUnread: false,
  },
  {
    id: "notif-7",
    initials: "MA",
    title: "Return request submitted",
    description: "Sarah Thompson submitted a return request for CC-3084.",
    timestamp: "Yesterday",
    isUnread: false,
  },
];
