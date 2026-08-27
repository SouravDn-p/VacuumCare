interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export default function NotificationsHeader({
  unreadCount,
  onMarkAllAsRead,
}: NotificationsHeaderProps) {
  return (
    <div className="notif-header">
      <div className="notif-header__title-wrap">
        <h1 className="notif-header__title">Notifications</h1>
        <p className="notif-header__subtitle">
          {unreadCount} {unreadCount === 1 ? "unread" : "unread"}
        </p>
      </div>

      <button
        type="button"
        id="notif-mark-all-btn"
        className="notif-header__mark-all"
        onClick={onMarkAllAsRead}
        aria-label="Mark all notifications as read"
      >
        Mark all as read
      </button>
    </div>
  );
}
