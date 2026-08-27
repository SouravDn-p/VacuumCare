import {
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  Send,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";

import type { ServiceRequestStatus } from "@/types/customer/service/customerTypes";

export default function ServiceRequestStatusBadge({
  status,
}: {
  status: ServiceRequestStatus;
}) {
  const config = configs[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${config.className}`}
    >
      <Icon size={11} strokeWidth={2} />
      {config.label}
    </span>
  );
}

const configs = {
  NEW: {
    label: "Submitted",
    icon: Send,
    className:
      "bg-[#e5f0ff] text-[#1a73e8]",
  },

  UNDER_REVIEW: {
    label: "Under Review",
    icon: Clock3,
    className:
      "bg-[#eef2f6] text-[#5f7180]",
  },

  QUOTE_SENT: {
    label: "Quotation Sent",
    icon: FileText,
    className:
      "bg-[#fff1e5] text-[#a96628]",
  },

  ACCEPTED: {
    label: "Accepted",
    icon: ShieldCheck,
    className:
      "bg-[#e7f1ff] text-[#1a73e8]",
  },

  SCHEDULED: {
    label: "Scheduled",
    icon: Clock3,
    className:
      "bg-[#e2efff] text-[#557b9c]",
  },

  IN_PROGRESS: {
    label: "In Progress",
    icon: LoaderCircle,
    className:
      "bg-[#e7effa] text-[#59738b]",
  },

  REPORT_SUBMITTED: {
    label: "Report Ready",
    icon: Wrench,
    className:
      "bg-[#eeeaff] text-[#6c5bb0]",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[#dff7e9] text-[#2f9a55]",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-[#fdeaea] text-[#bd5252]",
  },
} satisfies Record<
  ServiceRequestStatus,
  {
    label: string;
    icon: typeof Send;
    className: string;
  }
>;