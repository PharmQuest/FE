import React from "react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: "overview" | "reviews" | "info") => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="grid grid-cols-3 h-12 items-center text-center border-b border-gray-100">
      <button
        className={
          activeTab === "overview"
            ? "text-gray-500 text-subhead1-sb"
            : "text-gray-300 text-body1-r"
        }
        onClick={() => onTabChange("overview")}
      >
        개요
      </button>
      <button
        className={
          activeTab === "reviews"
            ? "text-gray-500 text-subhead1-sb"
            : "text-gray-300 text-body1-r"
        }
        onClick={() => onTabChange("reviews")}
      >
        리뷰
      </button>
      <button
        className={
          activeTab === "info"
            ? "text-gray-500 text-subhead1-sb"
            : "text-gray-300 text-body1-r"
        }
        onClick={() => onTabChange("info")}
      >
        정보
      </button>
    </div>
  );
};
