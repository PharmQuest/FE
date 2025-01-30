import React from "react";

interface WarningsProps {
  warnings?: string[];
}

const Warnings: React.FC<WarningsProps> = ({ warnings = [] }) => {
  return (
    <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
      {warnings.length > 0 ? (
        <ul className="text-gray-600 text-base space-y-1">
          {warnings.map((warning, idx) => (
            <li key={idx} className="mb-1">
              <span className="text-gray-900 font-semibold">* </span>
              {warning}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-base">경고 및 주의사항 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default Warnings;
