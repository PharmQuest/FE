interface FilterButtonProps {
  text: string;
  isSelected?: boolean;
  onClickFn: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  isSelected = false,
  onClickFn,
}) => {

  const baseClasses =
    "w-fit h-fit px-3 rounded-[1000px] text-subhead1-sb border-[1px] border-solid cursor-pointer";
  const selectedClasses = "bg-point text-white border-point";
  const unselectedClasses = "bg-white text-gray-300 border-gray-300";

  return (
    <button
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
      onClick={onClickFn}
    >
      {text}
    </button>
  );
};

export default FilterButton;
