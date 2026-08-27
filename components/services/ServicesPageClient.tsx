"use client";

import { useState } from "react";

import ServiceHero from "./ServiceHero";
import ServiceBenefits from "./ServiceBenefits";
import ServiceTabs from "./ServiceTabs";
import ServiceProcess from "./ServiceProcess";
import ServiceRequestSection from "./ServiceRequestSection";
import ServiceBottomBanner from "./ServiceBottomBanner";

export type ServiceTab =
    | "maintenance"
    | "installation";

export default function ServicesPageClient() {
    const [activeTab, setActiveTab] =
        useState<ServiceTab>("maintenance");

    const scrollToForm = () => {
        document
            .getElementById("service-request")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (
        <main className="bg-white">
            <ServiceHero
                onRequestService={() => {
                    setActiveTab("maintenance");

                    setTimeout(
                        scrollToForm,
                        50
                    );
                }}
                onRequestInstallation={() => {
                    setActiveTab("installation");

                    setTimeout(
                        scrollToForm,
                        50
                    );
                }}
            />

            <ServiceBenefits />

            <ServiceTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onGetQuote={scrollToForm}
            />

            <ServiceProcess />

            <ServiceRequestSection
                activeTab={activeTab}
            />

            <ServiceBottomBanner
                onRequest={scrollToForm}
            />
        </main>
    );
}