import React from "react";
import { createRoot } from "react-dom/client";
import { CurrentPossitionIcon } from "@public/svgs";

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton = ({ onClick }: CurrentLocationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border-none rounded-md shadow-md cursor-pointer m-2.5 w-10 h-10 flex items-center justify-center hover:bg-gray-50"
      aria-label="현재 위치로 이동"
    >
      <CurrentPossitionIcon />
    </button>
  );
};

export const createCurrentLocationControl = (
  map: google.maps.Map,
  onCurrentLocation: () => void
) => {
  const controlDiv = document.createElement("div");
  const root = createRoot(controlDiv);

  root.render(<CurrentLocationButton onClick={onCurrentLocation} />);

  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);

  return () => {
    root.unmount();
    const index = map.controls[google.maps.ControlPosition.RIGHT_TOP]
      .getArray()
      .indexOf(controlDiv);
    if (index > -1) {
      map.controls[google.maps.ControlPosition.RIGHT_TOP].removeAt(index);
    }
  };
};
