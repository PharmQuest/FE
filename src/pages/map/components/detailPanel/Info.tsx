import React from "react";
import { PharmacyDetails } from "../MapComponent";

interface InfoProps {
  pharmacy: PharmacyDetails;
}

const Info: React.FC<InfoProps> = ({ pharmacy }) => {
  const hasAnyInfo =
    pharmacy.wheelchair_accessible_entrance !== undefined ||
    pharmacy.website !== undefined;

  if (!hasAnyInfo) {
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
        {pharmacy.wheelchair_accessible_entrance !== undefined && (
          <div>
            <p className="text-body2-r text-gray-500 font-medium mb-1">
              접근성
            </p>
            <p className="text-body2-r text-gray-400">
              휠체어 접근 가능:{" "}
              {pharmacy.wheelchair_accessible_entrance ? "가능" : "불가능"}
            </p>
          </div>
        )}

        {pharmacy.website && (
          <div>
            <p className="text-body2-r text-gray-500 font-medium mb-1">
              웹사이트
            </p>
            <a
              href={pharmacy.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body2-r text-primary-500 hover:underline"
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
