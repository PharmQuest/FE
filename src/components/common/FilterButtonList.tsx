import { useRouter } from "next/router";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";

interface filterInfo {
  text: string;
  isSelected?: boolean;
  onClickFn?: () => void;
  isHomeButton?: boolean;
  isMobileButton?: boolean;
  url?: string;
  value?: string;
}

const FilterButtonList = ({ filterList, className }: { filterList: filterInfo[], className?: string }) => {

  const router = useRouter();
  const [category, setCategory] = useState(router.query.category as string || "ALL");

  useEffect(() => {
    setCategory(router.query.category as string || "ALL")
  }, [router])

  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {filterList?.map((item, index) => (
        <FilterButton key={index} text={item.text} isSelected={item.value === category} isHomeButton={item.isHomeButton} isMobileButton={item.isMobileButton} onClickFn={() => router.push(item.url || "")}/>
      ))}
    </div>
  )
}

export default FilterButtonList;