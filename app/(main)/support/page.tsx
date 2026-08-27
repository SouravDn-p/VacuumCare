import type { Metadata } from "next";

import SupportBanner from "@/components/support/SupportBanner";
import SupportHeader from "@/components/support/SupportHeader";
import SupportRequestForm from "@/components/support/SupportRequestForm";
import SupportSidebar from "@/components/support/SupportSidebar";

export const metadata: Metadata = {
  title: "Support Center",
  description:
    "Get technical support, installation assistance, warranty information, and service help from Enhancement.",
};

export default function SupportPage() {
  return (
    <main className="bg-white">
      <SupportHeader />

      {/* Main support area */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-14 lg:gap-16 xl:gap-20 items-start">
          <SupportRequestForm />
          <SupportSidebar />
        </div>
      </section>

      <SupportBanner />
    </main>
  );
}
