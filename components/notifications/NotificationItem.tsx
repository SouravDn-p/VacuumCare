"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  FileText,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

export type NotificationCategory = "service" | "e-commerce" | "refund";

export type NotificationIcon =
  | "quotation"
  | "order"
  | "schedule"
  | "payment"
  | "request"
  | "shipping"
  | "refund";

export interface NotificationData {
  id: string;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  icon: NotificationIcon;
  read: boolean;
  group: "today" | "yesterday" | "earlier";
  href?: string;
}

interface NotificationItemProps {
  notification: NotificationData;
  onRead: (id: string) => void;
}

function getIcon(type: NotificationIcon) {
  switch (type) {
    case "quotation":
      return FileText;

    case "order":
      return ShoppingBag;

    case "schedule":
      return CalendarDays;

    case "payment":
      return CheckCircle2;

    case "request":
      return FileCheck2;

    case "shipping":
      return Truck;

    case "refund":
      return PackageCheck;

    default:
      return FileText;
  }
}

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const Icon = getIcon(notification.icon);

  return (
    <Link
      href={notification.href || "/notifications"}
      onClick={() => onRead(notification.id)}
      className={`relative block w-full text-left transition ${
        notification.read
          ? ""
          : "rounded-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.035)]"
      }`}
    >
      {/* unread blue indicator */}
      {!notification.read && (
        <span className="absolute left-0 top-1/2 h-10 w-[3px] -translate-y-1/2 rounded-full bg-[#1a73e8]" />
      )}

      <div className="flex gap-4 px-5 py-5 sm:px-6">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5f0ff] text-[#1a73e8]">
          <Icon size={18} strokeWidth={1.8} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3
                className={`text-[14px] sm:text-[15px] leading-[21px] ${
                  notification.read
                    ? "font-medium text-[#515b62]"
                    : "font-semibold text-[#202428]"
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {notification.title}
              </h3>

              <p
                className="mt-1 text-[13px] sm:text-[14px] leading-[21px] text-[#646d74]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {notification.description}
              </p>

              {/* Category */}
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-[4px] bg-[#deedff] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3px] text-[#1a73e8]">
                  {notification.category}
                </span>

                {!notification.read && (
                  <span className="h-[6px] w-[6px] rounded-full bg-[#1a73e8]" />
                )}
              </div>
            </div>

            {/* Time */}
            <span
              className="shrink-0 text-[11px] sm:text-[12px] text-[#747e85]"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              {notification.time}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
