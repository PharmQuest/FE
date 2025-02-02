import React from "react";

interface UsagePurposeProps {
  content?: string[]; // 배열 형태로 변경
}

const UsagePurpose: React.FC<UsagePurposeProps> = ({ content=[] }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
      <ul className="list-disc list-outside text-gray-600 text-base">
        {content.map((item, idx) => (
          <li key={idx} className="mb-1">
            {item}
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default UsagePurpose;
