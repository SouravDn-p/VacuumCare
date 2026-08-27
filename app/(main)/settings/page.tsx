import type { Metadata } from "next";

import AccountManagement from "@/components/settings/AccountManagement";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your Enhancement account preferences, notifications and account settings.",
};

export default function SettingsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32 pb-24 lg:pb-32">
        <div className="max-w-[780px] mx-auto">
          <SettingsHeader />

          <div className="space-y-5">
            <NotificationSettings />
            <PreferencesSettings />
            <AccountManagement />
          </div>
        </div>
      </section>
    </main>
  );
}
