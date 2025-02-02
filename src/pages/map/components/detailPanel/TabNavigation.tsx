import React from "react";

type TabType = "overview" | "reviews" | "info";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: "overview" | "reviews" | "info") => void;
}

interface TabConfig {
  key: TabType;
  label: string;
}

const tabs: TabConfig[] = [
  { key: "overview", label: "개요" },
  { key: "reviews", label: "리뷰" },
  { key: "info", label: "정보" },
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="grid grid-cols-3 h-12 items-center text-center border-b border-gray-100">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          className={`
            ${
              activeTab === key
                ? "text-gray-500 text-subhead1-sb"
                : "text-gray-300 text-body1-r"
            }
            hover:bg-gray-50 h-full
          `}
          onClick={() => onTabChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
