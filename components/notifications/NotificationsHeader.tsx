"use client";

import { CheckCheck } from "lucide-react";

interface NotificationsHeaderProps {
  onMarkAllRead: () => void;
}

export default function NotificationsHeader({
  onMarkAllRead,
}: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1
          className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Notifications
        </h1>

        <p
          className="mt-2 text-[14px] sm:text-[15px] text-[#555f66]"
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          Manage your architectural service updates and order tracking.
        </p>
      </div>

      <button
        type="button"
        onClick={onMarkAllRead}
        className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[#1a73e8] transition hover:underline"
      >
        <CheckCheck size={16} strokeWidth={1.8} />
        Mark all as read
      </button>
    </div>
  );
}
