import React from "react";
import Link from "next/link";

const EmptySearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-52">
      <p className="text-headline-m text-gray-300">찾는 상비약이 없으신가요?</p>
      <p className="text-headline-m text-gray-300">
        철자를 확인하거나 다른 키워드로 검색해주세요!
      </p>

      <div className="mt-8">
        <Link
          href="/medicines"
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          전체 상비약 보기
        </Link>
      </div>
    </div>
  );
};

export default EmptySearchResults;
