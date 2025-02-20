import FilterButton from "@/components/common/FilterButton";
import MedicineCardList from "@/components/common/MedicineCardList";
import { useMedicineList } from "@/hooks/medicine/useMedicineList";
import useFormatCategory from "@/hooks/medicine/useFormatMedicineCategory";
import { useState } from "react";
import PageNavigator from "../../components/common/PageNavigator";
import Loader from "@/components/common/Loader";

const FILTER_CATEGORY = [
  "전체",
  "진통/해열",
  "소화/위장",
  "감기/기침",
  "알레르기",
  "상처/소독",
  "멀미",
  "안약",
  "기타",
];

const Medicine = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [page, setPage] = useState(1);
  const formatCategory = useFormatCategory();

  const { data, isLoading, isError } = useMedicineList({
    category: formatCategory(selectedCategory),
    page,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:w-[900px] lg:mx-auto md:w-[600px] md:mx-auto sm:w-full min-h-[calc(100vh-412px)] w-full px-5 md:px-0">
        <div className="md:text-display2-b md:my-9 text-m-subhead1-sb flex items-center gap-3 w-100% my-3">
          <h1 className="min-w-fit">{selectedCategory}</h1>

          <div className="md:flex hidden h-fit content-center gap-2 overflow-y-scroll scrollbar-hide">
            {FILTER_CATEGORY?.map((item, index) => (
              <FilterButton
                key={index}
                text={item}
                isSelected={item === selectedCategory}
                onClickFn={() => {
                  setSelectedCategory(item);
                  setPage(1);
                }}
              />
            ))}
          </div>
        </div>
        <MedicineCardList medicines={data?.medicines || []} />
        {data?.pagination && (
          <PageNavigator
            totalPage={data.pagination.totalPages}
            isFirst={page === 1}
            isLast={page === data.pagination.totalPages}
            page={page}
            setPage={setPage}
            className="mt-8"
          />
        )}
      </div>
    </>
  );
};

export default Medicine;
