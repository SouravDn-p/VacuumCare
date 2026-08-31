"use client";

import { STATUS_TABS, type RequestTab } from "./serviceRequestsData";

interface ServiceRequestsFilterTabsProps {
  activeTab: RequestTab;
  onTabChange: (tab: RequestTab) => void;
}

export default function ServiceRequestsFilterTabs({
  activeTab,
  onTabChange,
}: ServiceRequestsFilterTabsProps) {
  return (
    <div className="sr-tabs-container">
      <div className="sr-tabs" role="tablist" aria-label="Filter service requests by status">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`sr-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`sr-tab${isActive ? " sr-tab--active" : ""}`}
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
