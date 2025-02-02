import FilterButton from "./FilterButton";

interface filterInfo {
  text: string;
  isSelected?: boolean;
  onClckFn?: () => void;
  isHomeButton?: boolean;
}

const FilterButtonList = ({ filterLists }: { filterLists: filterInfo[] }) => {



  return (
    <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
      {filterLists.map((item, index) => (
        <FilterButton key={index} text={item.text} isHomeButton={item.isHomeButton} />
      ))}
    </div>
  )
}

export default FilterButtonList;