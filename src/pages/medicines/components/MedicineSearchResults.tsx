import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";
import MedicineCardList from "@/components/common/MedicineCardList";
import Loader from "@/components/common/Loader";
import PageNavigator from "@/components/common/PageNavigator";
import FilterButton from "@/components/common/FilterButton";
import EmptySearchResults from "../components/EmptySearchResults";
import { MEDICINE_CATEGORIES } from "@/constants/MedicineCategories";
import { MedicineCardProps } from "@/types/medicine";
import axios from "axios";

interface SearchResponse {
  code: string;
  message: string;
  result: {
    amountCount: number;
    amountPage: number;
    currentCount: number;
    currentPage: number;
    medicines: MedicineCardProps[];
  };
  isSuccess: boolean;
}

interface MedicineSearchResultsProps {
  initialKeyword?: string;
  initialCategory?: string;
  initialCountry?: string;
  initialPage?: number;
}

const MedicineSearchResults: React.FC<MedicineSearchResultsProps> = ({
  initialKeyword = "",
  initialCategory = "ALL",
  initialCountry = "ALL",
  initialPage = 1,
}) => {
  const router = useRouter();

  const keyword = router.isReady
    ? router.query.keyword?.toString() || initialKeyword
    : initialKeyword;
  const category = router.isReady
    ? router.query.category?.toString() || initialCategory
    : initialCategory;
  const country = router.isReady
    ? router.query.country?.toString() || initialCountry
    : initialCountry;
  const page = router.isReady
    ? typeof router.query.page === "string"
      ? parseInt(router.query.page)
      : typeof router.query.page === "number"
      ? router.query.page
      : initialPage
    : initialPage;

  const { data, isLoading, isError } = useQuery<SearchResponse>({
    queryKey: [
      "medicineSearch",
      {
        keyword,
        category,
        country,
        page,
      },
    ],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/medicine/search`, {
          params: {
            keyword,
            category,
            country,
            page,
            size: 10,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("검색 결과 없음:", error.response.data);
          return {
            code: "MED4001",
            message: "해당하는 약물을 찾을 수 없습니다.",
            result: {
              amountCount: 0,
              amountPage: 0,
              currentCount: 0,
              currentPage: page,
              medicines: [],
            },
            isSuccess: false,
          };
        }
        console.error("Medicine search API error:", error);
        throw error;
      }
    },
    enabled: router.isReady,
  });

  const handleCategoryChange = useCallback(
    (value: string) => {
      if (!router.isReady) return;

      const query = { ...router.query };
      query.category = value;
      query.page = "1";

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!router.isReady) return;

      const query = { ...router.query };
      query.page = newPage.toString();

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const noResults =
    !isLoading &&
    !isError &&
    (!data?.result?.medicines || data.result.medicines.length === 0);
  const searchCount = data?.result?.amountCount || 0;

  const selectedCategory = category || "ALL";

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 flex flex-col py-10">
      {/* 검색 결과 헤더 */}
      <div className="flex flex-col lg:flex-row lg:justify-row lg:items-center mb-8 gap-4">
        <h1 className="text-display2-b text-gray-600">
          {keyword ? `검색결과 ${searchCount}건` : `상비약 검색 결과`}
        </h1>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide pb-1">
          {MEDICINE_CATEGORIES.map((cat) => (
            <FilterButton
              key={cat.value}
              text={cat.display}
              isSelected={cat.value === selectedCategory}
              onClickFn={() => handleCategoryChange(cat.value)}
            />
          ))}
        </div>
      </div>

      {isLoading && <Loader />}

      {isError && (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-500 text-center text-headline-m">
            검색 중 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>
      )}

      {noResults && <EmptySearchResults />}

      {!isLoading &&
        !isError &&
        data?.result?.medicines &&
        data.result.medicines.length > 0 && (
          <>
            <MedicineCardList medicines={data.result.medicines} />

            {data.result.amountPage > 1 && (
              <PageNavigator
                totalPage={data.result.amountPage}
                isFirst={data.result.currentPage === 1}
                isLast={data.result.currentPage === data.result.amountPage}
                page={data.result.currentPage}
                setPage={handlePageChange}
                className="mt-10"
              />
            )}
          </>
        )}
    </div>
  );
};

export default MedicineSearchResults;
