import React from "react";

interface UsagePurposeProps {
  content?: string[]; // 배열 형태로 변경
}

const UsagePurpose: React.FC<UsagePurposeProps> = ({ content=[] }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
      <ul className="list-disc pl-5 space-y-2">
        {content.map((item, idx) => (
          <li key={idx} className="lg:text-body1-r text-m-body2-r">
            {item}
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default UsagePurpose;
