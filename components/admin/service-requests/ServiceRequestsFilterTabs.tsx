"use client";

import { STATUS_TABS, type RequestStatus } from "./serviceRequestsData";

interface ServiceRequestsFilterTabsProps {
  activeTab: RequestStatus;
  onTabChange: (tab: RequestStatus) => void;
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
