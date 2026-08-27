"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  PackageCheck,
} from "lucide-react";
import {
  notificationBody,
  notificationCategory,
  notificationHref,
  notificationIcon,
  isNotificationUnread,
  relativeTime,
} from "@/lib/mapCustomerNotification";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { NotificationIcon } from "@/components/notifications/NotificationItem";

interface NotificationsDropdownProps {
  onClose: () => void;
  isAdmin?: boolean;
}

function getNotificationIcon(type: NotificationIcon) {
  switch (type) {
    case "quotation":
      return FileText;
    case "shipping":
      return PackageCheck;
    case "schedule":
      return CalendarDays;
    case "payment":
      return CheckCircle2;
    default:
      return FileText;
  }
}

export default function NotificationsDropdown({
  onClose,
  isAdmin = false,
}: NotificationsDropdownProps) {
  const { data = [] } = useGetNotificationsQuery(undefined, {
    pollingInterval: 30000,
  });
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark notifications as read."));
    }
  };

  return (
    <div
      className="
        absolute
        right-0
        top-[48px]
        z-[100]
        w-[360px]
        overflow-hidden
        rounded-[14px]
        border
        border-[#e4e7ea]
        bg-white
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
        sm:w-[390px]
      "
    >
      <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-5">
        <h2
          className="text-[19px] font-bold text-[#202428]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Notifications
        </h2>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="text-[13px] font-semibold text-[#1a73e8] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-[455px] overflow-y-auto">
        {data.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13px] text-[#687178]">
            No notifications yet.
          </p>
        ) : (
          data.slice(0, 8).map((item) => {
            const Icon = getNotificationIcon(notificationIcon(item));
            const read = !isNotificationUnread(item);
            return (
              <Link
                key={item.id}
                href={notificationHref(item)}
                onClick={() => {
                  if (!read) void markAsRead(item.id);
                  onClose();
                }}
                className={`flex gap-4 px-5 py-4 transition hover:bg-[#f7faff] ${
                  read ? "opacity-55" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    read ? "bg-[#edf0f1] text-[#808a90]" : "bg-[#1a73e8] text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-[14px] font-semibold leading-[20px] text-[#202428]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-[11px] text-[#7b858c]">
                      {relativeTime(item.createdAt)}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[13px] leading-[19px] text-[#50585e]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {notificationBody(item)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {!read && <span className="h-2 w-2 rounded-full bg-[#1a73e8]" />}
                    <span className="text-[11px] font-semibold tracking-[0.5px] text-[#1a73e8]">
                      {notificationCategory(item).toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="border-t border-[#edf0f2] bg-white px-5 py-4 text-center">
        <Link
          href={isAdmin ? "/admin/notifications" : "/notifications"}
          onClick={onClose}
          className="text-[14px] font-bold text-[#1a73e8] hover:underline"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
}
