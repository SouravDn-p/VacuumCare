import type {
  NotificationCategory,
  NotificationIcon,
} from "@/components/notifications/NotificationItem";
import type { CustomerNotification } from "@/types/customer/service/customerTypes";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function relativeTime(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function notificationGroup(iso?: string): "today" | "yesterday" | "earlier" {
  if (!iso) return "earlier";
  const created = startOfDay(new Date(iso));
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (created.getTime() === today.getTime()) return "today";
  if (created.getTime() === yesterday.getTime()) return "yesterday";
  return "earlier";
}

export function notificationCategory(
  notification: CustomerNotification,
): NotificationCategory {
  const title = notification.title.toLowerCase();
  const data = notification.data ?? {};
  if (title.includes("refund") || data.refundId) return "refund";
  if (
    data.orderId ||
    title.includes("order") ||
    title.includes("ship") ||
    title.includes("payment")
  ) {
    return "e-commerce";
  }
  return "service";
}

export function notificationIcon(
  notification: CustomerNotification,
): NotificationIcon {
  const title = notification.title.toLowerCase();
  if (title.includes("refund")) return "refund";
  if (title.includes("ship")) return "shipping";
  if (title.includes("schedule") || title.includes("assigned")) return "schedule";
  if (title.includes("payment") || title.includes("paid")) return "payment";
  if (title.includes("quote") || title.includes("quotation")) return "quotation";
  if (title.includes("order")) return "order";
  return "request";
}

export function notificationHref(
  notification: CustomerNotification,
  isAdmin = false,
) {
  const data = notification.data ?? {};
  if (typeof data.paymentId === "string") {
    return isAdmin
      ? `/admin/payments/${data.paymentId}`
      : `/payment-history/${data.paymentId}`;
  }
  if (typeof data.orderId === "string") {
    return isAdmin ? "/admin/orders" : `/orders/${data.orderId}`;
  }
  if (typeof data.requestId === "string") {
    return isAdmin
      ? "/admin/service-requests"
      : `/service-requests/${data.requestId}`;
  }
  return isAdmin ? "/admin/notifications" : "/notifications";
}

export function initialsFromTitle(title: string) {
  const words = title.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function isNotificationUnread(notification: CustomerNotification) {
  return !notification.readAt && notification.isRead !== true;
}

export function notificationBody(notification: CustomerNotification) {
  return notification.body || notification.message || "";
}
