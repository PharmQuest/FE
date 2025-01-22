import React from "react";

interface IsOpenTagProps {
  isOpen: boolean;
}

const IsOpenTag: React.FC<IsOpenTagProps> = ({ isOpen }) => {
  return (
    <div
      className={`w-fit h-[18px] flex px-1 justify-center items-center rounded ${
        isOpen
          ? "bg-primary-300 text-white text-subhead3-sb"
          : "bg-primary-50 text-gray-400 text-caption1-r"
      }`}
    >
      {isOpen ? "영업중" : "영업종료"}
    </div>
  );
};

export default IsOpenTag;
