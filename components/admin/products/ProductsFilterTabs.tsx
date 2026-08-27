"use client";

import { PRODUCT_TABS, type ProductTab } from "./productsData";

interface ProductsFilterTabsProps {
  activeTab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
}

export default function ProductsFilterTabs({
  activeTab,
  onTabChange,
}: ProductsFilterTabsProps) {
  return (
    <div className="prod-tabs-container">
      <div className="prod-tabs" role="tablist" aria-label="Filter products">
        {PRODUCT_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`prod-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`prod-tab${isActive ? " prod-tab--active" : ""}`}
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
