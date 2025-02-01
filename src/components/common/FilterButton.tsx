interface FilterButtonProps {
  text: string;
  isSelected?: boolean;
  onClickFn?: () => void;
  isHomeButton?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  isSelected = false,
  onClickFn = () => {},
  isHomeButton = false,
}) => {

  const baseClasses = `whitespace-nowrap rounded-[1000px] w-fit w-[78px] lg:h-fit h-[30px] cursor-pointer ${isHomeButton ? `lg:px-5 px-4 lg:py-1.5 lg:text-body1-r text-xs` : `px-3 py-0.5 text-subhead1-sb border-[1px] border-solid`}`;
  const selectedClasses = isHomeButton 
  ? "bg-white text-[#707070] border-point font-semibold" // 메인화면은 흰색 배경으로
  : "bg-point text-white border-point"
  const unselectedClasses = `bg-white ${isHomeButton ? `text-gray-400  opacity-50` : `text-gray-300 border-gray-300`}`;

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