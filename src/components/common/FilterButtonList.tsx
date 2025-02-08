import FilterButton from "./FilterButton";

interface filterInfo {
  text: string;
  isSelected?: boolean;
  onClickFn?: () => void;
  isHomeButton?: boolean;
}

const FilterButtonList = ({ filterLists, className }: { filterLists: filterInfo[], className?: string }) => {

  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {filterLists.map((item, index) => (
        <FilterButton key={index} text={item.text} isHomeButton={item.isHomeButton} onClickFn={item.onClickFn} />
      ))}
    </div>
  )
}

export default FilterButtonList;