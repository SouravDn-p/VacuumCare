import {
  Check,
  Circle,
} from "lucide-react";

import type { ServiceRequestStatus } from "@/types/customer/service/customerTypes";

interface Props {
  status: ServiceRequestStatus;
  compact?: boolean;
}

const steps = [
  {
    key: "NEW",
    label: "Submitted",
  },
  {
    key: "QUOTE_SENT",
    label: "Quoted",
  },
  {
    key: "ACCEPTED",
    label: "Accepted",
  },
  {
    key: "SCHEDULED",
    label: "Scheduled",
  },
  {
    key: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    key: "COMPLETED",
    label: "Completed",
  },
] as const;

const statusIndex: Record<
  ServiceRequestStatus,
  number
> = {
  NEW: 0,
  UNDER_REVIEW: 0,
  QUOTE_SENT: 1,
  ACCEPTED: 2,
  SCHEDULED: 3,
  IN_PROGRESS: 4,
  REPORT_SUBMITTED: 4,
  COMPLETED: 5,
  CANCELLED: 0,
};

export default function ServiceRequestProgress({
  status,
  compact = true,
}: Props) {
  const currentIndex =
    statusIndex[status];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {steps.map((step, index) => {
            const completed =
              index < currentIndex;

            const active =
              index === currentIndex;

            return (
              <div
                key={step.key}
                className="flex items-center"
              >
                <span
                  className={`h-[7px] w-[7px] rounded-full ${
                    completed || active
                      ? "bg-[#1a73e8]"
                      : "bg-[#dfe5ea]"
                  } ${
                    active
                      ? "ring-1 ring-[#1a73e8] ring-offset-2"
                      : ""
                  }`}
                />

                {index <
                  steps.length - 1 && (
                  <span
                    className={`h-[1px] w-5 ${
                      index < currentIndex
                        ? "bg-[#1a73e8]"
                        : "bg-[#dfe5ea]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.5px] text-[#1a73e8]">
          Stage:{" "}
          {formatStatus(status)}
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-3">
      <div className="relative min-w-[650px]">
        <div className="absolute left-[5%] right-[5%] top-[17px] h-[2px] bg-[#dce3e8]" />

        <div
          className="absolute left-[5%] top-[17px] h-[2px] bg-[#1a73e8]"
          style={{
            width: `${
              (currentIndex /
                (steps.length - 1)) *
              90
            }%`,
          }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const completed =
              index < currentIndex;

            const active =
              index === currentIndex;

            return (
              <div
                key={step.key}
                className="relative z-10 flex w-1/6 flex-col items-center text-center"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-[4px] border-white ${
                    completed || active
                      ? "bg-[#1a73e8] text-white shadow-[0_0_0_1px_#1a73e8]"
                      : "bg-[#dfe5e9] text-[#869198]"
                  }`}
                >
                  {completed ? (
                    <Check
                      size={15}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Circle
                      size={8}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}
                </div>

                <p
                  className={`mt-3 text-[9px] font-semibold uppercase tracking-[0.4px] ${
                    completed || active
                      ? "text-[#1a73e8]"
                      : "text-[#8a959d]"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function formatStatus(
  status: ServiceRequestStatus,
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase();
}