import React from "react";

interface IsOpenTagProps {
  opening_hours?: {
    open_now?: boolean;
  };
}

const IsOpenTag: React.FC<IsOpenTagProps> = ({ opening_hours }) => {
  if (!opening_hours?.open_now && opening_hours?.open_now !== false) {
    return null;
  }

  return (
    <div
      className={`w-fit h-[18px] flex px-1 justify-center items-center rounded shrink-0 ${
        opening_hours.open_now
          ? "bg-primary-300 text-white text-subhead3-sb"
          : "bg-primary-50 text-gray-400 text-caption1-r"
      }`}
    >
      {opening_hours.open_now ? "영업중" : "영업종료"}
    </div>
  );
};

export default IsOpenTag;
