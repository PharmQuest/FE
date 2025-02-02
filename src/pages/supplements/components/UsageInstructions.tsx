import React from "react";

interface UsageInstructionsProps {
  instructions?: string[]; // 배열 형태로 변경
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ instructions = [] }) => {
  return (
    <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
      <ul className="list-disc list-outside text-gray-600 text-base">
        {instructions.map((instruction, idx) => (
          <li key={idx} className="mb-1">{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsageInstructions;
