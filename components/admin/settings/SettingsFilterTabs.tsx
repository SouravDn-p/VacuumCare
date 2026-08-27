"use client";

import { SETTINGS_TABS, type SettingsTab } from "./settingsData";

interface SettingsFilterTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsFilterTabs({
  activeTab,
  onTabChange,
}: SettingsFilterTabsProps) {
  return (
    <div className="set-tabs-container">
      <div className="set-tabs" role="tablist" aria-label="Settings categories">
        {SETTINGS_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              id={`set-tab-${tab.toLowerCase()}`}
              className={`set-tab${isActive ? " set-tab--active" : ""}`}
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
