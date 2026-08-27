import type { Metadata } from "next";

import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
    title: "Professional Vacuum Services & Installation",
    description:
        "Professional central vacuum repair, maintenance and installation services.",
};

export default function ServicesPage() {
    return <ServicesPageClient />;
}