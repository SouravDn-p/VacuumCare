import type { Metadata } from "next";
import NotificationsContainer from "@/components/admin/notifications/NotificationsContainer";

export const metadata: Metadata = {
  title: "Notifications",
  description: "View and manage system and customer activity notifications",
};

export default function NotificationsPage() {
  return <NotificationsContainer />;
}
