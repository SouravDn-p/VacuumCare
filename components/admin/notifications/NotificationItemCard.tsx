import Link from "next/link";
import { type AdminNotificationItem } from "./notificationsData";

interface NotificationItemCardProps {
  notification: AdminNotificationItem;
  onMarkAsRead?: (id: string) => void;
}

export default function NotificationItemCard({
  notification,
  onMarkAsRead,
}: NotificationItemCardProps) {
  const className = `notif-card${notification.isUnread ? " notif-card--unread" : ""}`;
  const content = (
    <>
      <div className="notif-card__left">
        <div className="notif-card__avatar" aria-hidden="true">
          {notification.initials}
        </div>

        <div className="notif-card__content">
          <div className="notif-card__title-row">
            <h2 className="notif-card__title">{notification.title}</h2>
            {notification.isUnread && (
              <span className="notif-card__unread-dot" aria-label="Unread notification" />
            )}
          </div>
          <p className="notif-card__desc">{notification.description}</p>
        </div>
      </div>

      <span className="notif-card__time">{notification.timestamp}</span>
    </>
  );

  if (notification.href) {
    return (
      <Link
        href={notification.href}
        className={className}
        onClick={() => onMarkAsRead?.(notification.id)}
        aria-label={notification.title}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
      onClick={() => onMarkAsRead?.(notification.id)}
      role="article"
      aria-label={notification.title}
    >
      {content}
    </div>
  );
}
