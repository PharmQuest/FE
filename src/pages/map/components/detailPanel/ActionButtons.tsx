import React from "react";
import { BookmarkIcon, DepartIcon, ArriveIcon } from "@public/svgs";
import { usePharmacyScrap } from "@/hooks/map/usePharmacyScrap";

interface ActionButtonsProps {
  onDirectionsClick: (type: "depart" | "arrive") => void;
  placeId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDirectionsClick,
  placeId,
}) => {
  const { isScraped, toggleScrap } = usePharmacyScrap(placeId);

  const handleScrap = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleScrap();
  };

  return (
    <div className="grid grid-cols-3 pt-4 pb-3 items-center justify-center text-subhead3-sb text-gray-400">
      <div
        className="flex flex-col gap-1 text-center items-center cursor-pointer hover:opacity-80"
        onClick={handleScrap}
      >
        <BookmarkIcon
          className="w-6 h-6"
          stroke={isScraped ? "#FFD755" : "#707070"}
          fill={isScraped ? "#FFD755" : "none"}
        />
        <p>저장</p>
      </div>
      <div
        className="flex flex-col gap-1 text-center items-center border-l border-gray-100 cursor-pointer hover:opacity-80"
        onClick={() => onDirectionsClick("depart")}
      >
        <DepartIcon className="w-6 h-6 stroke-gray-400" />
        <p>출발</p>
      </div>
      <div
        className="flex flex-col gap-1 text-center items-center border-l border-gray-100 cursor-pointer hover:opacity-80"
        onClick={() => onDirectionsClick("arrive")}
      >
        <ArriveIcon className="w-6 h-6 stroke-gray-400" />
        <p>도착</p>
      </div>
    </div>
  );
};

export default ActionButtons;
