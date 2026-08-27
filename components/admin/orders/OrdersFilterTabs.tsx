"use client";

import { ORDER_TABS, type OrderTab } from "./ordersData";

interface OrdersFilterTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

export default function OrdersFilterTabs({
  activeTab,
  onTabChange,
}: OrdersFilterTabsProps) {
  return (
    <div className="ord-tabs-container">
      <div className="ord-tabs" role="tablist" aria-label="Filter orders">
        {ORDER_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`ord-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`ord-tab${isActive ? " ord-tab--active" : ""}`}
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
