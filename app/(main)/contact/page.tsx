import type { Metadata } from "next";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactSupportCards from "@/components/contact/ContactSupportCards";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Elite Central Vacuum for product support, installation, repair, maintenance, and professional central vacuum services.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactSupportCards />
      <ContactFormSection />
    </main>
  );
}
