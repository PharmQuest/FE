import React from "react";
import { PharmacyDetails } from "../MapComponent";
import { GlobeIcon } from "@public/svgs";

interface InfoProps {
  pharmacy?: PharmacyDetails;
}

const Info: React.FC<InfoProps> = ({ pharmacy }) => {
  if (!pharmacy?.website) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-subhead1-sb text-gray-600 mt-4">추가 정보</p>
        </div>
        <p className="text-gray-400">현재 제공되는 추가 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-subhead1-sb text-gray-600 mt-4">추가 정보</p>
      </div>

      <div className="space-y-4">
        {pharmacy.website && (
          <div>
            <div className="flex flex-row gap-1">
              <GlobeIcon className="w-4 h-4 mt-[1px]" />
              <p className="text-body2-r text-gray-500 font-medium mb-1">
                웹사이트
              </p>
            </div>
            <a
              href={pharmacy.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body2-r text-primary-500 hover:underline break-all"
            >
              {pharmacy.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
