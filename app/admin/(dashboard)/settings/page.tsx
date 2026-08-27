import type { Metadata } from "next";
import SettingsContainer from "@/components/admin/settings/SettingsContainer";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure system settings, business profile, payment, shipping, and notification preferences",
};

export default function SettingsPage() {
  return <SettingsContainer />;
}
