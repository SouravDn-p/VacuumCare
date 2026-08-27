import type { Metadata } from "next";

import ProfilePageClient from "@/components/profile/ProfilePageClient";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Elite Central Vacuum profile and saved addresses.",
};

export default function ProfilePage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-28 sm:px-8 lg:px-10 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-[780px]">
          <ProfilePageClient />
        </div>
      </section>
    </main>
  );
}
