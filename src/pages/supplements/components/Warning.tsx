import React from "react";

interface WarningsProps {
  warnings?: string[];
}

const Warnings: React.FC<WarningsProps> = ({ warnings = [] }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
      {warnings.length > 0 ? (
      <ul className="list-disc pl-5 space-y-2">
          {warnings.map((warning, idx) => (
            <li key={idx} className="lg:text-body1-r text-m-body2-r">
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
