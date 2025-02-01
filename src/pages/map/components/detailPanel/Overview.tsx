import React from "react";
import { MapPinIcon, TimeIcon, CallIcon } from "@public/svgs";
import { PharmacyDetails } from "../MapComponent";

interface OverviewProps {
  pharmacy: PharmacyDetails;
}

export const Overview: React.FC<OverviewProps> = ({ pharmacy }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <MapPinIcon className="w-4 h-4" />
        <p className="text-body2-r text-gray-500">
          {pharmacy.formatted_address}
        </p>
      </div>

      {pharmacy.opening_hours && (
        <div className="flex flex-row items-center gap-2">
          <TimeIcon className="self-start mt-[2px]" />
          <ul className="text-body2-r text-gray-500 space-y-1">
            {pharmacy.opening_hours.weekday_text?.map((hours, idx) => (
              <li key={idx}>{hours}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-row items-center gap-2">
        <CallIcon />
        <p className="text-body2-r text-gray-500">
          {pharmacy.formatted_phone_number || "정보 없음"}
        </p>
      </div>
    </div>
  );
};
