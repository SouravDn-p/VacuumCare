"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

type NotificationKey =
  | "orderUpdates"
  | "serviceUpdates"
  | "paymentNotifications"
  | "scheduleReminders";

const notificationItems = [
  {
    key: "orderUpdates" as const,
    title: "Order Updates",
    description: "Stay informed about your system parts delivery status.",
  },
  {
    key: "serviceUpdates" as const,
    title: "Service Updates",
    description: "Technician arrival times and appointment changes.",
  },
  {
    key: "paymentNotifications" as const,
    title: "Payment Notifications",
    description: "Receive invoices and confirmation of payments.",
  },
  {
    key: "scheduleReminders" as const,
    title: "Schedule Reminders",
    description: "Get notified when it's time to check your filters or bags.",
  },
];

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<
    Record<NotificationKey, boolean>
  >({
    orderUpdates: true,
    serviceUpdates: true,
    paymentNotifications: false,
    scheduleReminders: true,
  });

  const handleToggle = (key: NotificationKey) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <section className="rounded-[16px] border border-[#edf1f5] bg-white p-6 sm:p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.025)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <Bell size={22} strokeWidth={1.8} className="text-[#1a73e8]" />

        <h2
          className="text-[20px] sm:text-[22px] font-semibold text-[#1a73e8]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Notifications
        </h2>
      </div>

      {/* Notification options */}
      <div className="space-y-7">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-6"
          >
            <div className="min-w-0">
              <h3
                className="text-[15px] sm:text-[16px] font-semibold text-[#252b30]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.title}
              </h3>

              <p
                className="mt-1 text-[13px] sm:text-[14px] leading-[20px] text-[#626b73]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.description}
              </p>
            </div>

            <Switch
              checked={notifications[item.key]}
              onChange={() => handleToggle(item.key)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-[24px] w-[44px] shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-[#1a73e8]" : "bg-[#dfe4e8]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-all duration-200 ${
          checked ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}
