"use client";

import { QUOTATION_TABS, type QuotationTab } from "./quotationsData";

interface QuotationsFilterTabsProps {
  activeTab: QuotationTab;
  onTabChange: (tab: QuotationTab) => void;
}

export default function QuotationsFilterTabs({
  activeTab,
  onTabChange,
}: QuotationsFilterTabsProps) {
  return (
    <div className="quote-tabs-container">
      <div className="quote-tabs" role="tablist" aria-label="Filter quotations">
        {QUOTATION_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`quote-tab-${tab.toLowerCase()}`}
              className={`quote-tab${isActive ? " quote-tab--active" : ""}`}
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
