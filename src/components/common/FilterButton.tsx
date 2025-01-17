import React, { useState } from "react";

interface FilterButtonProps {
  text: string;
  isSelected?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  isSelected = false,
}) => {
  const [selected, setSelected] = useState(isSelected);

  const baseClasses =
    "w-fit h-fit px-3 rounded-[1000px] text-subhead1-sb border-[1px] border-solid cursor-pointer";
  const selectedClasses = "bg-point text-white border-point";
  const unselectedClasses = "bg-white text-gray-300 border-gray-300";

  return (
    <button
      className={`${baseClasses} ${
        selected ? selectedClasses : unselectedClasses
      }`}
      onClick={() => setSelected(!selected)}
    >
      {text}
    </button>
  );
};

export default FilterButton;
