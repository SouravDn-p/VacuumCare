"use client";

import toast from "react-hot-toast";
import NotificationsHeader from "./NotificationsHeader";
import NotificationItemCard from "./NotificationItemCard";
import { useGetAdminNotificationsQuery } from "@/redux/features/api/admin/notificationsApi";
import {
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";
import {
  initialsFromTitle,
  isNotificationUnread,
  notificationBody,
  notificationHref,
  relativeTime,
} from "@/lib/mapCustomerNotification";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export default function NotificationsContainer() {
  const { data, isLoading } = useGetAdminNotificationsQuery(
    { page: 1, pageSize: 50 },
    { pollingInterval: 30000 },
  );
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const notifications = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark notifications as read."));
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark this notification as read."));
    }
  };

  return (
    <div className="notif-page">
      <NotificationsHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <div className="notif-list">
        {isLoading ? (
          <p className="notif-card__desc">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="notif-card__desc">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <NotificationItemCard
              key={notif.id}
              notification={{
                id: notif.id,
                initials: initialsFromTitle(notif.title) || "EC",
                title: notif.title,
                description: notificationBody(notif),
                timestamp: relativeTime(notif.createdAt),
                isUnread: isNotificationUnread(notif),
                href: notificationHref(notif, true),
              }}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
