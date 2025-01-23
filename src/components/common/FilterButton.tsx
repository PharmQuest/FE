import React, { useState } from "react";

interface FilterButtonProps {
  text: string;
  isSelected?: boolean;
  isHomeButton?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  isSelected = false,
  isHomeButton = false,
}) => {
  const [selected, setSelected] = useState(isSelected);

  const baseClasses = `rounded-[1000px] w-fit h-fit cursor-pointer ${isHomeButton ? `px-5 py-1.5 text-body1-r` : `px-3 py-0.5 text-subhead1-sb border-[1px] border-solid`}`;
  const selectedClasses = "bg-point text-white border-point";
  const unselectedClasses = `bg-white ${isHomeButton ? `text-gray-400  opacity-50` : `text-gray-300 border-gray-300`}`;

  return (
    <button
      className={`${baseClasses} 
      ${selected ? selectedClasses : unselectedClasses}`}
      onClick={() => setSelected(!selected)}
    >
      {text}
    </button>
  );
};

export default FilterButton;
