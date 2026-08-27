"use client";

import { PAYMENT_TABS, type PaymentTab } from "./paymentsData";

interface PaymentsFilterTabsProps {
  activeTab: PaymentTab;
  onTabChange: (tab: PaymentTab) => void;
}

export default function PaymentsFilterTabs({
  activeTab,
  onTabChange,
}: PaymentsFilterTabsProps) {
  return (
    <div className="pay-tabs-container">
      <div className="pay-tabs" role="tablist" aria-label="Filter payments">
        {PAYMENT_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`pay-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`pay-tab${isActive ? " pay-tab--active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
