import React from "react";

interface UsageInstructionsProps {
  instructions?: string[]; // 배열 형태로 변경
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ instructions = [] }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
      <ul className="list-disc pl-5 space-y-2">
        {instructions.map((instruction, idx) => (
          <li key={idx} className="lg:text-body1-r text-m-body2-r">{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsageInstructions;
