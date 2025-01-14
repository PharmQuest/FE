import React from "react";

interface SearchProps {
  textLabel?: string; // TextLabel은 선택적
  countryLabel?: string; // 나라 이름 (ex: 전체, 한국, 미국)
}

const Search: React.FC<SearchProps> = ({
  textLabel,
  countryLabel = "전체", // 기본값
}) => {
  return (
    <div className="max-w-[920px] w-[100%] mx-auto flex items-center gap-4">
      {/* TextLabel */}
      {textLabel && (
        <span className="text-display1-b text-gray-800">{textLabel}</span>
      )}

      {/* 검색창 */}
      <div className="flex items-center h-10 bg-white rounded-full px-4 py-3 gap-2 flex-grow shadow-md">
        <img
          src="/svgs/search.svg"
          alt="검색아이콘"
          className="w-6 h-6"
        />
        <input
          type="text"
          className="w-full bg-transparent text-body1-r text-gray-600 placeholder-gray-400 focus:outline-none"
          placeholder="복통약"
        />
      </div>

      {/* 위치선택 */}
      <button className="flex items-center h-10 bg-white rounded-full px-4 py-3 text-body1-r text-gray-800 shadow-md">
        <img
          src="/svgs/map-pin.svg"
          alt="위치 아이콘"
          className="w-6 h-6"
        />
        <span className="ml-2">{countryLabel}</span>
      </button>
    </div>
  );
};

export default Search;
