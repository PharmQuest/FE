import React from "react";
import { useRouter } from "next/router";

const EmptySearchResults = () => {
  const router = useRouter();

  const handleViewAllMedicines = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/medicines").then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-52">
      <p className="md:text-headline-m text-m-body2-r text-gray-300 text-center">
        찾는 상비약이 없으신가요?
        <br />
        철자를 확인하거나 다른 키워드로 검색해주세요!
      </p>
      <div className="mt-8">
        <button
          onClick={handleViewAllMedicines}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors md:text-headline-m text-m-body2-r"
        >
          전체 상비약 보기
        </button>
      </div>
    </div>
  );
};

export default EmptySearchResults;
