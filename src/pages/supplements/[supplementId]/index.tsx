import React from "react";
import ProductBasicInfo from "../components/ProductBasicInfo";
import UsagePurpose from "../components/UsagePurpose";
import UsageInstructions from "../components/UsageInstructions";
import Warnings from "../components/Warning";
import MoreSupplements from "../components/MoreSupplements";

import {
  productBasicInfo,
  usagePurpose,
  usageInstructions,
  warnings,
  supplements,
} from "../data/mockupData";

const SupplementInfo: React.FC = () => {
  const copyToClipboard = () => {
    const url = window.location.href; // 현재 페이지 URL
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  return (
    <div className="relative w-full h-full bg-white px-4 py-10">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-10">
        {/* 제품 기본 정보 */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">제품 기본 정보</h2>

          {/* URL 복사 버튼 */}
          <button
            onClick={copyToClipboard}
            className="absolute top-0 right-0 z-10 flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700"
          >
            {/* 아이콘이 안 보이는 경우 img 태그로 대체 */}
            {/* <img src="/svgs/external-link.svg" alt="URL 복사" className="w-5 h-5" /> */}
            <span>URL 복사</span>
          </button>

          {/* 제품 정보 컴포넌트 */}
          <ProductBasicInfo
            title={productBasicInfo.title}
            tags={productBasicInfo.tags || []}
            imageUrl={productBasicInfo.imageUrl}
            tableData={productBasicInfo.tableData}
          />
        </div>

        {/* 사용 목적 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">사용 목적</h2>
          <UsagePurpose content={usagePurpose} />
        </div>

        {/* 복용법 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">복용법</h2>
          <UsageInstructions instructions={usageInstructions} />
        </div>

        {/* 경고 및 주의사항 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">경고 및 주의사항</h2>
          <Warnings warnings={warnings} />
        </div>

        {/* 영양제 더보기 */}
        <div>
          <MoreSupplements supplements={supplements} imageWidth={287}/>
        </div>
      </div>
    </div>
  );
};

export default SupplementInfo;
