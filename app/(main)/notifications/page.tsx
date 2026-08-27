import type { Metadata } from "next";

import NotificationsList from "@/components/notifications/NotificationsList";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "View your Enhancement service, order and payment notifications.",
};

export default function NotificationsPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-28 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[1000px]">
          <NotificationsList />
        </div>
      </section>
    </main>
  );
}
