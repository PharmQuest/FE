import React from "react";
import { MapPinIcon, TimeIcon, CallIcon } from "@public/svgs";
import { PharmacyDetails } from "../MapComponent";

interface OverviewProps {
  pharmacy: PharmacyDetails;
}

const Overview: React.FC<OverviewProps> = ({ pharmacy }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <MapPinIcon className="w-4 h-4 self-start mt-[2px] stroke-gray-300 shrink-0" />
        <p className="text-body2-r text-gray-500">
          {pharmacy?.formatted_address ?? "주소 미제공"}
        </p>
      </div>

      {pharmacy?.opening_hours && (
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
          {pharmacy?.formatted_phone_number ?? "번호 미제공"}
        </p>
      </div>
    </div>
  );
};

export default Overview;
