import { useRouter } from "next/router";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";

interface filterInfo {
  text: string;
  isSelected?: boolean;
  onClickFn?: () => void;
  isHomeButton?: boolean;
  isMobileButton?: boolean;
  pathName?: string;
  value?: string;
}

const FilterButtonList = ({ filterList, className }: { filterList: filterInfo[], className?: string }) => {

  const router = useRouter();
  const [category, setCategory] = useState(router.query.category as string || "ALL");

  const segments = router.pathname.split('/')

  let url = '/medicines/search';

  if (segments[1] === 'community') {
    url = segments[3] === 'search' ? '/community/posts/search' : '/community/posts';
  } else if (segments[1] === 'supplements') {
    url = '/supplements';
  } else if (segments[1] === 'medicines') {
    url = '/medicines/search';
  }

  useEffect(() => {
    console.log(category)
    if (segments[1] === 'supplements') {
      setCategory(router.query.category as string || "전체")
    }
    else {
      setCategory(router.query.category as string || "ALL")
    }
    
  }, [router])

  const handleButton = (category: string) => {
    router.push({
      pathname: url,
      query: { ...router.query, category: category},
    })
  }

  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {filterList?.map((item, index) => (
        <FilterButton key={index} text={item.text} isSelected={item.value === category} isHomeButton={item.isHomeButton} isMobileButton={item.isMobileButton} onClickFn={() => handleButton(item.value || "")}/>
      ))}
    </div>
  )
}

export default FilterButtonList;