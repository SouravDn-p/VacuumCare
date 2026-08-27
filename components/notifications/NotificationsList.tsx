"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import NotificationsHeader from "./NotificationsHeader";
import NotificationFilters, {
  type NotificationFilter,
} from "./NotificationFilters";
import NotificationItem, { type NotificationData } from "./NotificationItem";
import {
  notificationBody,
  notificationCategory,
  notificationGroup,
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

const groups = [
  { key: "today", label: "TODAY" },
  { key: "yesterday", label: "YESTERDAY" },
  { key: "earlier", label: "EARLIER" },
] as const;

export default function NotificationsList() {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const { data, isLoading } = useGetNotificationsQuery(undefined, {
    pollingInterval: 30000,
  });
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const notifications: NotificationData[] = useMemo(
    () =>
      (data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        description: notificationBody(item),
        time: relativeTime(item.createdAt),
        category: notificationCategory(item),
        icon: notificationIcon(item),
        read: !isNotificationUnread(item),
        group: notificationGroup(item.createdAt),
        href: notificationHref(item),
      })),
    [data],
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "unread") {
      return notifications.filter((notification) => !notification.read);
    }
    return notifications.filter(
      (notification) => notification.category === activeFilter,
    );
  }, [notifications, activeFilter]);

  const handleRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark this notification as read."));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark notifications as read."));
    }
  };

  return (
    <>
      <NotificationsHeader onMarkAllRead={handleMarkAllRead} />

      <div className="mt-14">
        <NotificationFilters
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      <div className="mt-12 space-y-10">
        {isLoading ? (
          <div className="py-20 text-center text-[15px] text-[#687178]">
            Loading notifications...
          </div>
        ) : (
          groups.map((group) => {
            const items = filteredNotifications.filter(
              (notification) => notification.group === group.key,
            );
            if (!items.length) return null;

            return (
              <section key={group.key}>
                <div className="flex items-center gap-4">
                  <p
                    className="shrink-0 text-[10px] font-semibold tracking-[1.5px] text-[#7d878e]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {group.label}
                  </p>
                  <div className="h-px flex-1 bg-[#e8ecef]" />
                </div>
                <div className="mt-4 space-y-1">
                  {items.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onRead={handleRead}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}

        {!isLoading && filteredNotifications.length === 0 && (
          <div className="py-20 text-center">
            <p
              className="text-[15px] text-[#687178]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No notifications found.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
