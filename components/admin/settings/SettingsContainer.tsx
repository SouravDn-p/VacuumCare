"use client";

import { useState } from "react";
import SettingsFilterTabs from "./SettingsFilterTabs";
import BusinessSettingsForm from "./BusinessSettingsForm";
import LandingHeroSettingsForm from "./LandingHeroSettingsForm";
import PaymentSettingsForm from "./PaymentSettingsForm";
import ShippingSettingsForm from "./ShippingSettingsForm";
import NotificationSettingsForm from "./NotificationSettingsForm";
import { type SettingsTab } from "./settingsData";

export default function SettingsContainer() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Business");

  return (
    <div className="set-page">
      <div className="set-content-layout">
        <SettingsFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "Business" && (
          <>
            <BusinessSettingsForm />
            <LandingHeroSettingsForm />
          </>
        )}
        {activeTab === "Payment" && <PaymentSettingsForm />}
        {activeTab === "Shipping" && <ShippingSettingsForm />}
        {activeTab === "Notifications" && <NotificationSettingsForm />}
      </div>
    </div>
  );
}
